import "server-only";

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

const METADATA_BLOCK_PATTERN = /export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};?/;

// Enumerated by webpack at bundle time (see next.config.ts's `?raw` rule) so no
// filesystem access happens at request time — the Cloudflare Worker runtime has none.
type WebpackRequireContext = { keys(): string[] };
const listSlugs = (): string[] =>
  (
    require as unknown as {
      context(dir: string, sub: boolean, regExp: RegExp): WebpackRequireContext;
    }
  )
    .context("../../content/blogs", false, /\.mdx$/)
    .keys()
    .map((key) => key.replace(/^\.\//, "").replace(/\.mdx$/, ""))
    .sort((left, right) => left.localeCompare(right));

function stripMetadata(source: string): string {
  const match = source.match(METADATA_BLOCK_PATTERN);
  if (!match) return source.trim();
  return source.slice((match.index ?? 0) + match[0].length).trim();
}

async function buildPost(slug: string): Promise<Post> {
  const [mod, raw] = await Promise.all([
    import(`../../content/blogs/${slug}.mdx`) as Promise<PostModule>,
    import(`../../content/blogs/${slug}.mdx?raw`) as Promise<{ default: string }>,
  ]);
  const markdown = raw.default;
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
  const posts = await Promise.all(listSlugs().map(buildPost));

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
