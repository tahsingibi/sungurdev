import { getPostsStore } from '@/src/lib/store/posts-store';
import WriteDetailView from '@/src/view/write/detail';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { findBySlug } = await getPostsStore();
  const post = findBySlug(slug);

  if (post)
    return {
      title: post?.metadata?.title,
      description: post?.metadata?.description,
    };

  return {};
}

export default async function Page(props: PageProps) {
  return <WriteDetailView {...props} />;
}
