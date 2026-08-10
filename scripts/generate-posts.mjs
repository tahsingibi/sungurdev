import { promises as fs } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const contentDirectory = path.join(projectRoot, "content", "blogs");
const outputDirectory = path.join(projectRoot, "src", "generated");
const outputFile = path.join(outputDirectory, "posts.json");

const files = (await fs.readdir(contentDirectory, { withFileTypes: true }))
  .filter(
    (entry) =>
      entry.isFile() &&
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")),
  )
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right));

const posts = await Promise.all(
  files.map(async (file) => ({
    slug: file.replace(/\.mdx?$/, ""),
    markdown: await fs.readFile(path.join(contentDirectory, file), "utf8"),
  })),
);

await fs.mkdir(outputDirectory, { recursive: true });
await fs.writeFile(outputFile, `${JSON.stringify(posts, null, 2)}\n`, "utf8");

console.log(`Generated ${posts.length} blog posts in src/generated/posts.json`);
