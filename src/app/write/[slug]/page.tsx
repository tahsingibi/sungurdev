import { getPostsStore } from '@/src/lib/store/posts-store';
import WriteDetailView from '@/src/view/write/detail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { findBySlug } = await getPostsStore();
  const post = findBySlug(slug);

  if (!post) return notFound();

  const { title, description, publishDate } = post.metadata;
  const postUrl = `/write/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: postUrl },
    openGraph: {
      title,
      description,
      url: postUrl,
      type: 'article',
      publishedTime: new Date(publishDate).toISOString(),
      modifiedTime: new Date(publishDate).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@tahsingibi',
    },
  };
}

export async function generateStaticParams() {
  const { all: posts } = await getPostsStore();
  return posts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export default async function Page(props: PageProps) {
  return <WriteDetailView {...props} />;
}
