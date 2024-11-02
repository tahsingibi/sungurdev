import { ImageResponse } from 'next/og';
import OpenGraph from '../components/opengraph';
import { defaultPath } from '../metadata';
export const runtime = 'edge';

export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const font = fetch(
    new URL(`${defaultPath}/doc/font/inter.woff2`, import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(<OpenGraph />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: await font,
        style: 'normal',
        weight: 400,
      },
    ],
  });
}
