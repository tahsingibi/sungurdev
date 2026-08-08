import { getPostsStore } from '@/src/lib/store/posts-store';
import settings from '@/src/settings';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET() {
  const { all: posts } = await getPostsStore();
  const baseUrl = settings.url.replace(/\/$/, '');
  const feedUrl = `${baseUrl}/rss.xml`;
  const lastBuildDate = posts[0]?.metadata.publishDate
    ? new Date(posts[0].metadata.publishDate).toUTCString()
    : new Date().toUTCString();

  const items = posts.map(({ slug, metadata }) => {
    const url = `${baseUrl}/write/${slug}`;

    return `
    <item>
      <title>${escapeXml(metadata.title)}</title>
      <description>${escapeXml(metadata.description)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(metadata.publishDate).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(settings.name)}</dc:creator>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${settings.name} — Writing`)}</title>
    <description>${escapeXml(`Technical notes and practical development guides by ${settings.name}.`)}</description>
    <link>${baseUrl}/write</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
