import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import settings from "@/lib/settings";

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
  canonicalUrl: string;
  markdownUrl: string;
  githubUrl: string;
}

const contentDirectory = path.join(process.cwd(), settings.blog.contentDirectory);

function readString(source: string, key: keyof PostMetadata): string {
  const expression = new RegExp(
    `${key}\\s*:\\s*(?:'((?:\\\\.|[^'])*)'|"((?:\\\\.|[^"])*)"|\`([^\`]*)\`)`,
  );
  const match = source.match(expression);
  const value = match?.[1] ?? match?.[2] ?? match?.[3] ?? "";

  return value
    .replaceAll("\\'", "'")
    .replaceAll('\\"', '"')
    .replaceAll("\\n", "\n");
}

function parsePost(slug: string, markdown: string): Post {
  const metadataBlock = markdown.match(
    /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};?/,
  );
  const metadataSource = metadataBlock?.[1] ?? "";
  const body = metadataBlock
    ? markdown.slice((metadataBlock.index ?? 0) + metadataBlock[0].length).trim()
    : markdown.trim();
  const siteUrl = settings.url.replace(/\/$/, "");

  return {
    slug,
    title: readString(metadataSource, "title") || slug,
    publishDate: readString(metadataSource, "publishDate"),
    description: readString(metadataSource, "description"),
    category: readString(metadataSource, "category") || "Writing",
    markdown,
    body,
    canonicalUrl: `${siteUrl}/write/${slug}`,
    markdownUrl: `${siteUrl}/write/${slug}.md`,
    githubUrl: `${settings.blog.repository}/blob/${settings.blog.repositoryBranch}/${settings.blog.contentDirectory}/${slug}.mdx`,
  };
}

export const getPosts = cache(async (): Promise<Post[]> => {
  const files = await fs.readdir(contentDirectory);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx?$/, "");
        const markdown = await fs.readFile(path.join(contentDirectory, file), "utf8");
        return parsePost(slug, markdown);
      }),
  );

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
