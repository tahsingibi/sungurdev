import OpenGraph from '@/src/components/opengraph';
import { getOpenGraphFont } from '@/src/lib/opengraph-font';
import { getPostsStore } from '@/src/lib/store/posts-store';
import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image(props: ImageProps) {
  const params = await props.params;
  const font = await getOpenGraphFont();
  const { findBySlug } = await getPostsStore();
  const post = findBySlug(params.slug);

  const ogData = {
    title: post?.metadata.title,
    subtitle: post?.metadata.category,
  };

  return new ImageResponse(<OpenGraph {...ogData} />, {
    ...size,
    fonts: [
      {
        name: 'DM',
        data: font,
        style: 'normal',
        weight: 400,
      },
    ],
  });
}
