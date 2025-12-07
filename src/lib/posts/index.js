import { format } from 'date-fns';
import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

function readAllPosts() {
  const dir = path.join(process.cwd(), 'content', 'blogs');
  const files = fs.readdirSync(dir);

  const posts = files
    .filter(
      (filename) => filename.endsWith('.mdx') && !filename.startsWith('.')
    )
    .map((filename) => {
      const slug = filename.replace('.mdx', '');

      try {
        const { metadata } = require(`@/content/blogs/${filename}`);

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
          },
        };
      }
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.publishDate).getTime() -
        new Date(a.metadata.publishDate).getTime()
    );

  return posts;
}

export const getPosts = cache(async () => readAllPosts());

export default getPosts;

export const getPost = cache(async (slug) => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
});

export async function getPostBySlug({ slug }) {
  return getPost(slug);
}
