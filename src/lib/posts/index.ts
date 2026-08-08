import { format } from 'date-fns';
import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import type { FeaturedBlock, MdxModule, Post } from '@/src/types/content';

function isFeaturedBlock(value: unknown): value is FeaturedBlock {
  if (!value || typeof value !== 'object' || !('type' in value)) return false;

  const featured = value as Record<string, unknown>;
  if (featured.type === 'image') {
    return typeof featured.src === 'string' && typeof featured.alt === 'string';
  }
  if (featured.type === 'x-post') {
    return typeof featured.id === 'string';
  }
  if (featured.type === 'video') {
    return typeof featured.src === 'string';
  }
  return false;
}

async function readAllPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), 'content', 'blogs');
  const files = fs.readdirSync(dir);

  const posts = await Promise.all(files
    .filter(
      (filename) => filename.endsWith('.mdx') && !filename.startsWith('.')
    )
    .map(async (filename) => {
      const slug = filename.replace('.mdx', '');

      try {
        const { metadata } = (await import(`@/content/blogs/${filename}`)) as MdxModule;

        const publishDate = metadata?.publishDate;
        const formattedDate = publishDate
          ? format(new Date(publishDate), 'MMMM dd, yyyy')
          : undefined;

        return {
          slug,
          metadata: {
            title: metadata?.title ?? 'Untitled',
            publishDate: publishDate ?? '1970-01-01',
            description: metadata?.description ?? '',
            category: metadata?.category ?? '',
            date: formattedDate,
            featured: isFeaturedBlock(metadata?.featured) ? metadata.featured : undefined,
          },
        };
      } catch (error) {
        console.error(`Error loading metadata for file ${filename}:`, error);
        return {
          slug,
          metadata: {
            title: 'Untitled',
            publishDate: '1970-01-01',
            description: '',
            category: '',
            date: undefined,
            featured: undefined,
          },
        };
      }
    }));

  return posts.sort(
      (a, b) =>
        new Date(b.metadata.publishDate).getTime() -
        new Date(a.metadata.publishDate).getTime()
    );
}

export const getPosts = cache(readAllPosts);

export default getPosts;

export const getPost = cache(async (slug: string) => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
});

export async function getPostBySlug({ slug }: { slug: string }) {
  return getPost(slug);
}
