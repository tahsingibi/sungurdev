import { getPostsStore } from '@/src/lib/store/posts-store';
import settings from '@/src/settings';

export const dynamic = 'force-static';

export async function GET() {
  const { all: posts } = await getPostsStore();
  const baseUrl = settings.url.replace(/\/$/, '');
  const content = `# ${settings.name}\n\n> ${settings.title} portfolio, experience and technical notes.\n\n## Main pages\n\n- [Home](${baseUrl}/): Profile, selected work and latest notes.\n- [Experience](${baseUrl}/works): Professional experience and projects.\n- [Writing](${baseUrl}/write): All technical notes.\n\n## Blog posts\n\n${posts.map(({ slug, metadata }) => `- [${metadata.title}](${baseUrl}/write/${slug}/markdown): ${metadata.description}`).join('\n')}\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
