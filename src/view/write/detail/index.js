import React from 'react';
import dynamic from 'next/dynamic';
import { getPost } from '@/src/lib/get-posts';

export default async function WriteDetailView({ params, ...props }) {
  const { slug } = params;
  const post = await getPost(params);
  const MDXContent = dynamic(() => import(`@/content/blogs/${slug}.mdx`));

  return (
    <div className="w-full flex flex-col gap-12 !max-w-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-4xl font-medium">{post.metadata.title}</h3>
        <p className="text-zinc-600">
          <span>
            in {post.metadata.category} - {post.metadata.date}
          </span>
        </p>
      </div>
      <article className="prose max-w-full grow">
        <MDXContent />
      </article>
    </div>
  );
}
