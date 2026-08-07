import getPosts from '@/src/lib/posts';
import { cache } from 'react';
import type { PostStore } from '@/src/types/content';

export const getPostsStore = cache(async (): Promise<PostStore> => {
  const posts = await getPosts();

  return {
    all: posts,
    latest: posts.slice(0, 3),
    findBySlug(slug: string | null) {
      return posts.find((post) => post.slug === slug);
    },
  };
});
