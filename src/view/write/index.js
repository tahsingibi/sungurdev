import Link from 'next/link';
import posts from '@/src/lib/get-posts';
import db from '@/db';

export default async function WriteView() {
  const { heading, description, error } = db.pages.write;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col leading-loose gap-2">
        <h2 className="text-4xl text-white">{heading}</h2>
        <p>{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        {posts.length ? (
          posts.map((post) => (
            <Link
              className="flex flex-col  p-4 hover:bg-zinc-900/25 rounded-lg active:translate-y-px transition-all"
              href={`/write/${post.slug}`}
              key={post.slug}
            >
              <span className="text-xl">{post.metadata.title}</span>
              <span className="text-zinc-600">{post.metadata.date}</span>
            </Link>
          ))
        ) : (
          <span>{error}</span>
        )}
      </div>
    </div>
  );
}
