/**
 * Interaction probe (build tooling, not shipped).
 *
 * Loads a page in headless Chrome, runs a caller-supplied snippet of JS in the
 * page, and prints the JSON result. Used to verify tab switching, a11y wiring
 * and computed brand values without a test runner.
 *
 * Usage:
 *   node scripts/probe.mjs --url=http://127.0.0.1:5199/ --expr="document.title"
 *   node scripts/probe.mjs --url=... --file=scripts/probes/menu-tabs.js
 */
import { spawn } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { tmpdir } from "node:os";

import WebSocket from "ws";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.length ? rest.join("=") : "true"];
  }),
);

const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

const chromePath = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
if (!chromePath) throw new Error("No Chrome/Edge binary found");

const url = args.url;
if (!url) throw new Error("--url is required");
const width = Number(args.width ?? 1440);
const height = Number(args.height ?? 900);
const expression = args.file ? readFileSync(resolve(args.file), "utf8") : args.expr;
if (!expression) throw new Error("--expr or --file is required");

const profile = resolve(tmpdir(), `rafikis-probe-${Date.now()}`);
const port = 9900 + Math.floor(Math.random() * 90);

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--disable-extensions",
    "--disable-background-networking",
    "--hide-scrollbars",
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

async function targetInfo() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await res.json();
      const page = list.find((entry) => entry.type === "page");
      if (page?.webSocketDebuggerUrl) return page;
    } catch {
      /* booting */
    }
    await sleep(250);
  }
  throw new Error("Chrome did not expose a debugging target");
}

const page = await targetInfo();
const socket = new WebSocket(page.webSocketDebuggerUrl, { maxPayload: 256 * 1024 * 1024 });
let nextId = 0;
const pending = new Map();
socket.on("message", (raw) => {
  const message = JSON.parse(raw.toString());
  if (message.id && pending.has(message.id)) {
    const { resolve: ok, reject: no } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) no(new Error(JSON.stringify(message.error)));
    else ok(message.result);
  }
});
await new Promise((done, fail) => {
  socket.on("open", done);
  socket.on("error", fail);
});
const send = (method, params = {}) => {
  nextId += 1;
  const id = nextId;
  return new Promise((ok, no) => {
    pending.set(id, { resolve: ok, reject: no });
    socket.send(JSON.stringify({ id, method, params }));
  });
};

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url });
await sleep(2500);

const { result, exceptionDetails } = await send("Runtime.evaluate", {
  expression,
  awaitPromise: true,
  returnByValue: true,
});

if (exceptionDetails) {
  console.error("page exception:", JSON.stringify(exceptionDetails, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(result.value, null, 2));
}

socket.close();
chrome.kill();
await sleep(200);
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  /* best effort */
}
process.exit(process.exitCode ?? 0);
