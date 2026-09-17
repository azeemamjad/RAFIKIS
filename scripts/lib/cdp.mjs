/**
 * Shared headless-Chrome driver (build tooling, not shipped).
 *
 * Reused by scripts/shot.mjs, scripts/probe.mjs and
 * scripts/render-brand-assets.mjs so the CDP plumbing lives in one place.
 */
import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import WebSocket from "ws";

const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

export const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

export function findChrome() {
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("No Chrome/Edge binary found");
  return found;
}

/** Launches headless Chrome and returns a small CDP client. */
export async function launch({ width = 1440, height = 900, port } = {}) {
  const chromePath = findChrome();
  const profile = resolve(
    tmpdir(),
    `rafikis-chrome-${Date.now()}-${Math.floor(Math.random() * 1e4)}`,
  );
  const debugPort = port ?? 9500 + Math.floor(Math.random() * 400);

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
      `--remote-debugging-port=${debugPort}`,
      `--window-size=${width},${height}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let wsUrl;
  for (let attempt = 0; attempt < 80 && !wsUrl; attempt += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
      const list = await res.json();
      const page = list.find((entry) => entry.type === "page");
      if (page?.webSocketDebuggerUrl) wsUrl = page.webSocketDebuggerUrl;
    } catch {
      /* still booting */
    }
    if (!wsUrl) await sleep(250);
  }
  if (!wsUrl) {
    chrome.kill();
    throw new Error("Chrome did not expose a debugging target");
  }

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

  return {
    send,
    async close() {
      try {
        socket.close();
      } catch {
        /* already closed */
      }
      chrome.kill();
      await sleep(250);
      try {
        rmSync(profile, { recursive: true, force: true });
      } catch {
        /* profile cleanup is best-effort */
      }
    },
  };
}

/** Navigates and waits for load + webfonts. */
export async function open(client, url, { settle = 500, timeout = 45000 } = {}) {
  await client.send("Page.navigate", { url });
  const started = Date.now();
  for (;;) {
    const { result } = await client.send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    });
    if (result.value === "complete" || Date.now() - started > timeout) break;
    await sleep(150);
  }
  await client.send("Runtime.evaluate", {
    expression:
      "document.fonts ? Promise.all([...document.fonts].map(f => f.load().catch(() => null))).then(() => document.fonts.ready).then(() => true) : true",
    awaitPromise: true,
    returnByValue: true,
  });
  await sleep(settle);
}

/** Returns the border-box of a selector in page coordinates. */
export async function measure(client, selector) {
  const { result } = await client.send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.x + window.scrollX,
        y: r.y + window.scrollY,
        width: r.width,
        height: r.height,
      };
    })()`,
    returnByValue: true,
  });
  if (!result.value) throw new Error(`selector not found: ${selector}`);
  return result.value;
}

/** Captures a PNG and returns a Buffer. */
export async function capture(client, clip, { transparent = false, scale = 1 } = {}) {
  if (transparent) {
    await client.send("Emulation.setDefaultBackgroundColorOverride", {
      color: { r: 0, g: 0, b: 0, a: 0 },
    });
  } else {
    await client.send("Emulation.setDefaultBackgroundColorOverride", {});
  }
  const shot = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    ...(clip ? { clip: { ...clip, scale } } : {}),
  });
  return Buffer.from(shot.data, "base64");
}

/** Captures one element at its exact rendered size. */
export async function captureElement(client, selector, options = {}) {
  const box = await measure(client, selector);
  return {
    box,
    png: await capture(
      client,
      { x: box.x, y: box.y, width: box.width, height: box.height },
      options,
    ),
  };
}
