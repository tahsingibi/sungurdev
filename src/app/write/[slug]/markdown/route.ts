import { getPostMarkdown } from '@/src/lib/posts/markdown';
import { getPostsStore } from '@/src/lib/store/posts-store';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const { all: posts } = await getPostsStore();
  return posts.map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const markdown = await getPostMarkdown(slug);

  if (!markdown) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${slug}.md"`,
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
