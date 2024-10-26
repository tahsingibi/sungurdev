import Link from 'next/link';
import posts from '@/src/lib/get-posts';
import db from '@/db';

export default async function WriteView() {
  const { write } = db.pages;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl text-wrap font-medium text-white capitalize">
          {write.heading}
        </h2>
        <p className="text-zinc-500">{write.description}</p>
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
          <span>{write.error}</span>
        )}
      </div>
    </div>
  );
}
