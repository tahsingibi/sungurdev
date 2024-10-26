import { getPost } from '@/src/lib/get-posts';
import WriteDetailView from '@/src/view/write/detail';

export async function generateMetadata({ params }) {
  const post = await getPost(params);
  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default async function Page(props) {
  return <WriteDetailView {...props} />;
}
