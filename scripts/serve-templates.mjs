/**
 * Minimal static file server for the brand asset templates (build tooling).
 *
 * Chrome refuses to load fonts and images over file:// for these templates, so
 * the renderer serves brand-templates/ and src/assets/ over HTTP on demand.
 *
 * Usage: node scripts/serve-templates.mjs [--port=5177]
 */
import { createServer } from "node:http";
import { existsSync, statSync, readFileSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.length ? rest.join("=") : "true"];
  }),
);

const port = Number(args.port ?? 5177);
const root = resolve(import.meta.dirname, "..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".json": "application/json",
};

const server = createServer((request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${port}`);
  const relative = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
  const target = join(root, relative);

  if (!target.startsWith(root) || !existsSync(target) || !statSync(target).isFile()) {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("not found");
    return;
  }

  response.writeHead(200, {
    "content-type": MIME[extname(target).toLowerCase()] ?? "application/octet-stream",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
  });
  response.end(readFileSync(target));
});

server.listen(port, "127.0.0.1", () => {
  console.log(`brand templates served from ${root} on http://127.0.0.1:${port}`);
});
