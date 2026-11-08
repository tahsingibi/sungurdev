import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";
import sharp from "sharp";
import settings from "../src/lib/settings.ts";

const publicPath = (path) => resolve(import.meta.dirname, "../public", `.${path}`);

test("every project selection reuses the canonical record", () => {
  for (const [key, project] of Object.entries(settings.projects)) {
    assert.equal(project.id, key);
    assert.ok(project.name && project.tech, `Incomplete project: ${key}`);
  }
  for (const project of [...settings.work, ...settings.experience.flatMap((job) => job.projects)]) {
    assert.equal(project, settings.projects[project.id], `Duplicate project record: ${project.id}`);
  }
  for (const key of [...settings.home.projects.ids, ...settings.home.about.projectIds]) {
    assert.ok(settings.projects[key], `Unknown selected project: ${key}`);
    assert.ok(settings.projects[key].live || settings.projects[key].repo);
  }
  assert.ok(settings.experience.some((job) => job.id === settings.home.about.companyId));
});

test("navigation uses unique, directly accessible page routes", () => {
  const routes = new Set([settings.routes.home, settings.routes.works, settings.routes.write]);
  assert.equal(new Set(settings.nav.map((item) => item.path)).size, settings.nav.length);
  for (const item of settings.nav) {
    assert.ok(routes.has(item.path), `Unknown navigation destination: ${item.path}`);
    assert.ok(!item.path.includes("#"));
    const page = item.path === "/" ? "src/app/page.tsx" : `src/app${item.path}/page.tsx`;
    assert.ok(existsSync(resolve(import.meta.dirname, "..", page)));
  }
});

test("gallery, project logos, and SEO reference existing assets without unused files", async () => {
  const used = new Set(settings.gallery.map((photo) => photo.src));
  assert.equal(new Set(settings.gallery.map((photo) => photo.id)).size, settings.gallery.length);
  assert.ok(used.has(settings.image), "SEO profile must reference a gallery image");
  for (const photo of settings.gallery) {
    assert.ok(photo.name.trim());
    assert.ok(existsSync(publicPath(photo.src)), `Missing image: ${photo.src}`);
    const meta = await sharp(publicPath(photo.src)).metadata();
    assert.equal(meta.format, "webp");
    assert.ok(meta.width <= 1600 && meta.height <= 1600, `Oversized image: ${photo.src}`);
  }
  for (const project of Object.values(settings.projects)) {
    if (!project.logo) continue;
    const { src, monochrome } = project.logo;
    used.add(src);
    assert.ok(existsSync(publicPath(src)), `Missing project logo: ${src}`);
    if (monochrome) {
      assert.ok(src.endsWith(".svg"));
      const svg = readFileSync(publicPath(src), "utf8");
      assert.ok(svg.includes("<svg"));
      assert.ok(!/<script\b|<foreignObject\b|\bon\w+\s*=/i.test(svg));
    } else {
      const meta = await sharp(publicPath(src)).metadata();
      assert.equal(meta.format, "webp");
      assert.equal(meta.width, meta.height);
      assert.ok(meta.width <= 256, `Oversized logo: ${src}`);
    }
  }
  const files = readdirSync(publicPath("/images")).map((name) => `/images/${name}`);
  assert.deepEqual(files.sort(), [...used].sort(), "Unused or unregistered image in public/images");
});

test("local assets and experience anchors resolve", () => {
  assert.ok(existsSync(publicPath(settings.resume)));
  const anchors = new Set();
  for (const job of settings.experience) {
    assert.ok(job.path.startsWith(`${settings.routes.works}#`));
    assert.ok(!anchors.has(job.path));
    anchors.add(job.path);
  }
  const source = readFileSync(resolve(import.meta.dirname, "../src/lib/settings.ts"), "utf8");
  assert.ok(!source.includes("/images/work/"), "Stale, nonexistent company image paths");
});
