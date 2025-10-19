import getPosts from '@/src/lib/get-posts';
import { cache } from 'react';

export const getPostsStore = cache(async () => {
  const posts = await getPosts();

  return {
    all: posts,
    latest: posts.slice(0, 3),
    findBySlug(slug) {
      return posts.find((post) => post.slug === slug);
    },
  };
});
