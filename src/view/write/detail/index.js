import { getPost } from '@/src/lib/get-posts';
import dynamic from 'next/dynamic';
import NotFound from '../../not-found';
import BackButton from './back-button';

export default async function WriteDetailView({ params, ...props }) {
  const { slug } = params;
  const post = await getPost(params);
  if (post) {
    const MDXContent = dynamic(() => import(`@/content/blogs/${slug}.mdx`));
    const { category, date, title } = post.metadata;
    return (
      <div className="w-full flex flex-col gap-12 !max-w-full">
        <div className="flex flex-col gap-2 border-b border-zinc-900 pb-12">
          <BackButton />
          <h3 className="text-2xl font-medium">{title}</h3>
          <p className="text-zinc-600 text-sm">
            <span className="inline-flex gap-2 items-center">
              {category && (
                <span className="text-zinc-600 px-2 text-xs py-px border border-zinc-800 w-fit rounded">
                  {category}
                </span>
              )}
              {date}
            </span>
          </p>
        </div>
        <article className="prose max-w-full grow prose-p:text-base">
          <MDXContent />
        </article>
      </div>
    );
  }

  return <NotFound />;
}
