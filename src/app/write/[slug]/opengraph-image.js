import OpenGraph, { fontURL } from '@/src/components/opengraph';
import { defaultPath } from '@/src/metadata';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image(props) {
  const params = await props.params;
  const font = fetch(new URL(fontURL, import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

  const request = await fetch(
    `${defaultPath}/api/posts?slug=${params.slug}`
  );

  const data = await request.json();

  let ogData = {
    title: data?.title,
    subtitle: data?.subtitle,
  };

  return new ImageResponse(<OpenGraph {...ogData} />, {
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
