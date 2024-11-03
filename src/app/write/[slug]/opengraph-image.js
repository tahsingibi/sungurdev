import OpenGraph, { fontURL } from '@/src/components/opengraph';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }) {
  const font = fetch(new URL(fontURL, import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(<OpenGraph />, {
    ...size,
    fonts: [
      {
        name: 'DM',
        data: await font,
        style: 'normal',
        weight: 400,
      },
    ],
  });
}
