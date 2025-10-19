import { getPostsStore } from '@/src/lib/store/posts-store';
import WriteDetailView from '@/src/view/write/detail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { findBySlug } = await getPostsStore();
  const post = findBySlug(slug);

  if (post)
    return {
      title: post?.metadata?.title,
      description: post?.metadata?.description,
    };
}

export default async function Page(props) {
  return <WriteDetailView {...props} />;
}
