import type { MetadataRoute } from "next";
import settings from "@/lib/settings";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = settings.url.replace(/\/$/, "");
  // AI search/answer crawlers are welcome (GEO). Training crawlers (GPTBot,
  // ClaudeBot, ...) stay blocked by Cloudflare's managed robots.txt section;
  // listing them here too produced contradictory Allow/Disallow groups.
  return {
    rules: [{
      userAgent: ["*", "Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User"],
      allow: "/",
      disallow: ["/api/"],
    }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
