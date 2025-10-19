import { getPostsStore } from '@/src/lib/store/posts-store';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');

  const { findBySlug } = await getPostsStore();
  const post = findBySlug(slug) || {};

  return NextResponse.json({
    title: post?.metadata?.title || null,
    subtitle: post?.metadata?.category || null,
    ...post,
  });
}
