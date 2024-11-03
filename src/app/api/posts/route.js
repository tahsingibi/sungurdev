import { getPost } from '@/src/lib/get-posts';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');

  const post = (await getPost({ slug })) || {};

  return NextResponse.json({
    title: post?.metadata?.title || null,
    subtitle: post?.metadata?.category || null,
    ...post,
  });
}
