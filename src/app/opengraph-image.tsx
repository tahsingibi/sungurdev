import OpenGraph from '@/src/components/opengraph';
import { getOpenGraphFont } from '@/src/lib/opengraph-font';
import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const font = await getOpenGraphFont();

  return new ImageResponse(<OpenGraph />, {
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
