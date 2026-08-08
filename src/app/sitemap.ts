import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = settings.url.replace(/\/$/, "");
  const posts = await getPosts();
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/write`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...posts.map((post) => ({ url: post.canonicalUrl, lastModified: new Date(post.publishDate), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
