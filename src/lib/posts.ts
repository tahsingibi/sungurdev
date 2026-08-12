import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import settings from "@/lib/settings";
import { cache } from "react";
import type { ComponentType } from "react";

export interface PostMetadata {
  title: string;
  publishDate: string;
  description: string;
  category: string;
}

export interface Post extends PostMetadata {
  slug: string;
  markdown: string;
  body: string;
  Content: ComponentType;
  canonicalUrl: string;
  markdownUrl: string;
  githubUrl: string;
}

interface PostModule {
  default: ComponentType;
  metadata: PostMetadata;
}

const contentDirectory = path.join(process.cwd(), "content", "blogs");
const METADATA_BLOCK_PATTERN = /export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};?/;

function stripMetadata(source: string): string {
  const match = source.match(METADATA_BLOCK_PATTERN);
  if (!match) return source.trim();
  return source.slice((match.index ?? 0) + match[0].length).trim();
}

async function listSlugs(): Promise<string[]> {
  const entries = await fs.readdir(contentDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""))
    .sort((left, right) => left.localeCompare(right));
}

async function buildPost(slug: string): Promise<Post> {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const [mod, markdown] = await Promise.all([
    import(`../../content/blogs/${slug}.mdx`) as Promise<PostModule>,
    fs.readFile(filePath, "utf8"),
  ]);
  const body = stripMetadata(markdown);
  const siteUrl = settings.url.replace(/\/$/, "");

  return {
    slug,
    ...mod.metadata,
    markdown,
    body,
    Content: mod.default,
    canonicalUrl: `${siteUrl}/write/${slug}`,
    markdownUrl: `${siteUrl}/write/${slug}.md`,
    githubUrl: `${settings.blog.repository}/blob/${settings.blog.repositoryBranch}/${settings.blog.contentDirectory}/${slug}.mdx`,
  };
}

export const getPosts = cache(async (): Promise<Post[]> => {
  const slugs = await listSlugs();
  const posts = await Promise.all(slugs.map(buildPost));

  return posts.sort(
    (left, right) =>
      new Date(right.publishDate).getTime() - new Date(left.publishDate).getTime(),
  );
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
});

export function postToPlainText(post: Post): string {
  return post.body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
