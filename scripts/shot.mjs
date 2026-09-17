/**
 * Screenshot / render helper (build tooling, not shipped).
 *
 * Drives headless Chrome over the DevTools Protocol to capture full-page or
 * element screenshots. Used to verify the site and to export brand assets
 * (logo lockups, social templates, OG image) from HTML sources.
 *
 * Usage:
 *   node scripts/shot.mjs --url=http://127.0.0.1:5199/ --out=shot.png [--width=1440]
 *   node scripts/shot.mjs --url=file:///c:/path/to/card.html --out=card.png \
 *        --width=1080 --height=1080 --selector=#card [--transparent] [--scale=2]
 *   node scripts/shot.mjs --url=... --out=shot.png --full
 */
import { spawn } from "node:child_process";
import { mkdirSync, existsSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
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
const out = resolve(args.out ?? "shot.png");
const width = Number(args.width ?? 1440);
const height = Number(args.height ?? 900);
const scale = Number(args.scale ?? 1);
const fullPage = args.full === "true";
const selector = args.selector;
const transparent = args.transparent === "true";
const readyDelay = Number(args.delay ?? 1200);

if (!url) throw new Error("--url is required");
mkdirSync(dirname(out), { recursive: true });

const profile = resolve(tmpdir(), `rafikis-shot-${Date.now()}`);
const port = 9500 + Math.floor(Math.random() * 400);

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-background-networking",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
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
      /* chrome still booting */
    }
    await sleep(250);
  }
  throw new Error("Chrome did not expose a debugging target");
}

function connect(wsUrl) {
  return new Promise((done, fail) => {
    const socket = new WebSocket(wsUrl, { maxPayload: 512 * 1024 * 1024 });
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
    socket.on("error", fail);
    socket.on("open", () =>
      done({
        send(method, params = {}) {
          nextId += 1;
          const id = nextId;
          return new Promise((ok, no) => {
            pending.set(id, { resolve: ok, reject: no });
            socket.send(JSON.stringify({ id, method, params }));
          });
        },
        close: () => socket.close(),
      }),
    );
  });
}

const page = await targetInfo();
const client = await connect(page.webSocketDebuggerUrl);

await client.send("Page.enable");
await client.send("Runtime.enable");
await client.send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: scale,
  mobile: false,
});
if (transparent) {
  await client.send("Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 0, g: 0, b: 0, a: 0 },
  });
}

await client.send("Page.navigate", { url });
await new Promise((done) => {
  const started = Date.now();
  const poll = async () => {
    try {
      const { result } = await client.send("Runtime.evaluate", {
        expression: "document.readyState",
        returnByValue: true,
      });
      if (result.value === "complete" && Date.now() - started > readyDelay) return done();
    } catch {
      /* navigating */
    }
    if (Date.now() - started > 45000) return done();
    setTimeout(poll, 200);
  };
  poll();
});

// Wait for webfonts so brand type never exports in a fallback face.
await client.send("Runtime.evaluate", {
  expression: "document.fonts ? document.fonts.ready.then(() => true) : true",
  awaitPromise: true,
  returnByValue: true,
});
await sleep(400);

let clip;
if (selector) {
  const { result } = await client.send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x + window.scrollX, y: r.y + window.scrollY, width: r.width, height: r.height };
    })()`,
    returnByValue: true,
  });
  if (!result.value) throw new Error(`selector not found: ${selector}`);
  clip = { ...result.value, scale: 1 };
} else if (!fullPage) {
  await client.send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
  clip = { x: 0, y: 0, width, height, scale: 1 };
}

const shot = await client.send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  ...(clip ? { clip } : {}),
});

const { writeFileSync } = await import("node:fs");
writeFileSync(out, Buffer.from(shot.data, "base64"));
console.log(`wrote ${out}`);

client.close();
chrome.kill();
await sleep(300);
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  /* profile cleanup is best-effort */
}
process.exit(0);
