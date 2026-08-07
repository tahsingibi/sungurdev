import { defaultPath, sitemap as sitemapData } from '@/src/metadata';
import { getPostsStore } from '@/src/lib/store/posts-store';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { all: posts } = await getPostsStore();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, metadata }) => {
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
