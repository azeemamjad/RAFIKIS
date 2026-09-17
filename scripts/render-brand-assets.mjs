/**
 * Renders the Rafikis brand assets from brand-templates/*.html (build tooling).
 *
 * Requires the template server: node scripts/serve-templates.mjs
 *
 * Usage: node scripts/render-brand-assets.mjs [--port=5177] [--only=lockups]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { capture, captureElement, launch, measure, open } from "./lib/cdp.mjs";

/** Re-encodes a PNG buffer as JPEG using the same headless Chrome session. */
async function toJpeg(client, pngBuffer, quality) {
  const dataUrl = `data:image/png;base64,${pngBuffer.toString("base64")}`;
  const { result } = await client.send("Runtime.evaluate", {
    expression: `(async () => {
      const img = new Image();
      img.src = ${JSON.stringify(dataUrl)};
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/jpeg", ${quality / 100}).split(",")[1];
    })()`,
    awaitPromise: true,
    returnByValue: true,
  });
  return Buffer.from(result.value, "base64");
}

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.length ? rest.join("=") : "true"];
  }),
);

const port = Number(args.port ?? 5177);
const base = `http://127.0.0.1:${port}`;
const root = resolve(import.meta.dirname, "..");
const brandDir = resolve(root, "public/brand");
const socialDir = resolve(root, "public/brand/social");
mkdirSync(brandDir, { recursive: true });
mkdirSync(socialDir, { recursive: true });

const write = (path, buffer) => {
  writeFileSync(path, buffer);
  console.log(`  ${path.replace(root, ".")}  ${(buffer.length / 1024).toFixed(1)} KB`);
};

/**
 * Writes an image, re-encoding to JPEG when the extension asks for it. Flat
 * artwork (icons, lockups) stays PNG; photography-heavy cards ship as JPEG so
 * they upload cleanly to Instagram, WhatsApp and iMessage.
 */
async function writeImage(client, outPath, pngBuffer, { quality = 90 } = {}) {
  const path = resolve(root, outPath);
  if (path.toLowerCase().endsWith(".jpg") || path.toLowerCase().endsWith(".jpeg")) {
    write(path, await toJpeg(client, pngBuffer, quality));
    return;
  }
  write(path, pngBuffer);
}

/** [selector, outputPath, { transparent }] */
const LOCKUPS = [
  ["#lockup-primary", "public/brand/lockup-primary.png", {}],
  ["#lockup-stacked-sand", "public/brand/lockup-primary-on-sandstone.png", {}],
  ["#lockup-clay", "public/brand/lockup-clay-orange.png", {}],
  ["#lockup-horizontal", "public/brand/lockup-horizontal.png", {}],
  ["#wordmark-only", "public/brand/wordmark.png", { transparent: true }],
  ["#mark-square", "public/brand/mark-square.png", {}],
];

/** [selector, outputPath] */
const SOCIAL = [
  ["#avatar", "public/brand/social/instagram-profile-1000.png"],
  ["#announce", "public/brand/social/post-opening-announcement-1080.jpg"],
  ["#post-chooza", "public/brand/social/post-chooza-chicken-1080.jpg"],
  ["#post-ribs", "public/brand/social/post-beef-jungle-ribs-1080.jpg"],
  ["#post-mishkaki", "public/brand/social/post-beef-mishkaki-1080.jpg"],
  ["#post-lamb", "public/brand/social/post-lamb-chops-1080.jpg"],
  ["#post-samosas", "public/brand/social/post-samosas-1080.jpg"],
  ["#post-pilipili", "public/brand/social/post-pili-pili-fries-1080.jpg"],
  ["#post-mandazi", "public/brand/social/post-mandazi-ice-cream-1080.jpg"],
  ["#story-mishkaki", "public/brand/social/story-beef-mishkaki-1080x1920.jpg"],
  ["#story-story", "public/brand/social/story-our-story-1080x1920.jpg"],
];

const ICONS = [
  ["#icon-512", "public/icon-512.png"],
  ["#icon-180", "public/apple-touch-icon.png"],
  ["#icon-32", "public/favicon-32.png"],
];

const only = args.only;

const client = await launch({ width: 1440, height: 1000 });
try {
  if (!only || only === "lockups") {
    console.log("Lockups:");
    await open(client, `${base}/brand-templates/lockups.html`);
    for (const [selector, out, options] of LOCKUPS) {
      const { png } = await captureElement(client, selector, { transparent: options.transparent });
      await writeImage(client, out, png);
    }
  }

  if (!only || only === "social") {
    console.log("Social:");
    await open(client, `${base}/brand-templates/social.html`, { settle: 1500 });
    for (const [selector, out] of SOCIAL) {
      const { png } = await captureElement(client, selector);
      await writeImage(client, out, png, { quality: 90 });
    }
  }

  if (!only || only === "og") {
    console.log("Open Graph:");
    await open(client, `${base}/brand-templates/og.html`);
    const box = await measure(client, "#og-card");
    const png = await capture(client, box);
    await writeImage(client, "public/og.png", png);
    await writeImage(client, "public/og.jpg", png, { quality: 90 });
  }

  if (!only || only === "icons") {
    console.log("App icons:");
    await open(client, `${base}/brand-templates/icons.html`, { settle: 400 });
    for (const [selector, out] of ICONS) {
      const { png } = await captureElement(client, selector);
      await writeImage(client, out, png);
    }
  }
} finally {
  await client.close();
}

console.log("done");
