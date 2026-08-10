import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getPosts();
  const siteUrl = settings.url.replace(/\/$/, "");
  const entries = posts.map((post) => `- [${post.title}](${post.markdownUrl}): ${post.description}`).join("\n");
  const body = `# ${settings.name}\n\n> ${settings.seo.description}\n\n## Writing\n\n${entries}\n\n## Feeds and discovery\n\n- [RSS feed](${siteUrl}/rss.xml)\n- [Sitemap](${siteUrl}/sitemap.xml)\n- [Website](${siteUrl})\n`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=86400" } });
}
