import { defaultPath, sitemap as sitemapData } from '@/src/metadata';
import { getPostsStore } from '@/src/lib/store/posts-store';

export default async function sitemap() {
  const { all: posts } = await getPostsStore();

  const postEntries = posts.map(({ slug, metadata }) => {
    const publishDate = metadata?.publishDate;
    const lastModified = publishDate
      ? new Date(publishDate).toISOString()
      : new Date().toISOString();

    return {
      url: `${defaultPath}write/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  return [...sitemapData, ...postEntries];
}
