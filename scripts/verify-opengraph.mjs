import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import settings from "../src/lib/settings.ts";

const root = resolve(import.meta.dirname, "..");
const buildMode = process.argv.includes("--build");
const base = process.argv.find((arg) => /^https?:\/\//.test(arg)) ?? "http://localhost:3000";
const slugs = (await readdir(resolve(root, settings.blog.contentDirectory)))
  .filter((name) => name.endsWith(".mdx"))
  .map((name) => name.slice(0, -4));
const pages = [...settings.nav.map((item) => item.path), ...slugs.map((slug) => `${settings.routes.write}/${slug}`)];
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

async function request(path) {
  return fetch(new URL(path, base), { signal: AbortSignal.timeout(30_000) });
}

function imageMeta(html, key) {
  const values = [];
  for (const match of html.matchAll(/<meta\b[^>]*>/g)) {
    const attrs = Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((attr) => [attr[1], attr[2].replaceAll("&amp;", "&")]));
    if ((attrs.property ?? attrs.name) === key && attrs.content) values.push(attrs.content);
  }
  assert.equal(values.length, 1, `Expected one ${key} tag, received ${values.length}`);
  return new URL(values[0], base);
}

async function verifyPng(bytes, label) {
  const buffer = Buffer.from(bytes);
  assert.ok(buffer.subarray(0, 8).equals(pngSignature), `${label}: invalid PNG signature`);
  const metadata = await sharp(buffer).metadata();
  assert.equal(metadata.format, "png", label);
  assert.equal(metadata.width, 1200, label);
  assert.equal(metadata.height, 630, label);
  // Decode the complete image, not just its header, to catch truncated streams.
  await sharp(buffer).raw().toBuffer();
}

if (!buildMode) {
  // Reproduce the reported bug: next/image must initialize Sharp BEFORE OG.
  const image = `${encodeURIComponent(settings.image)}&w=64&q=75`;
  const warm = await request(`/_next/image?url=${image}`);
  assert.equal(warm.status, 200, "Image optimizer must remain functional");
  await warm.arrayBuffer();
  const blockedSvg = await request(`/_next/image?url=${encodeURIComponent(settings.projects.hal.logo.src)}&w=64&q=75`);
  assert.equal(blockedSvg.status, 400, "SVG optimization must remain disabled");
  await blockedSvg.arrayBuffer();
}

const images = new Map();
for (const page of pages) {
  let html;
  if (buildMode) {
    const file = page === "/" ? "index" : page.slice(1);
    html = await readFile(resolve(root, `.next/server/app/${file}.html`), "utf8");
  } else {
    const response = await request(page);
    assert.equal(response.status, 200, page);
    html = await response.text();
  }
  const og = imageMeta(html, "og:image");
  const twitter = imageMeta(html, "twitter:image");
  const expected = page.startsWith(`${settings.routes.write}/`) ? `${page}/opengraph-image` : "/opengraph-image";
  assert.equal(og.pathname, expected, `${page}: incorrect OG route`);
  assert.equal(twitter.pathname, expected, `${page}: Twitter must use the generated card`);
  images.set(og.pathname, `${og.pathname}${og.search}`);
  console.log(`PASS metadata ${page}`);
}

for (const [path, url] of images) {
  let bytes;
  if (buildMode) {
    bytes = await readFile(resolve(root, `.next/server/app${path}.body`));
  } else {
    const response = await request(url);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^image\/png\b/, path);
    bytes = await response.arrayBuffer();
  }
  await verifyPng(bytes, path);
  console.log(`PASS PNG ${path}`);
}
console.log(`Verified ${pages.length} page metadata sets and ${images.size} complete 1200×630 PNGs (${buildMode ? "production build" : base}).`);
