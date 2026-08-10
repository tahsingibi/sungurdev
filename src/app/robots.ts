import type { MetadataRoute } from "next";
import settings from "@/lib/settings";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = settings.url.replace(/\/$/, "");
  return {
    rules: [{
      userAgent: ["*", "Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "GPTBot", "ClaudeBot", "Claude-User", "PerplexityBot"],
      allow: "/",
      disallow: ["/api/"],
    }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
