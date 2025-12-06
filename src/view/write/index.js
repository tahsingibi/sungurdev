import { getPostsStore } from '@/src/lib/store/posts-store';
import db from '@/src/settings';
import Link from 'next/link';

export default async function WriteView() {
  const { heading, description, error } = db.pages.write;
  const { all: posts } = await getPostsStore();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col leading-loose gap-2 border-b border-zinc-900 pb-12">
        <h2 className="text-4xl text-white">{heading}</h2>
        <p className="text-zinc-500">{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        {posts.length ? (
          posts.map((post) => {
            const { title, category, date } = post.metadata;
            return (
              <section
                className="flex flex-col gap-1 rounded-lg p-4 transition-colors hover:bg-zinc-900/25"
                key={post.slug}
              >
                <Link href={`/write/${post.slug}`} className="text-xl text-white w-fit">
                  {title}
                </Link>
                <span className="inline-flex items-center gap-2 text-sm text-zinc-600">
                  {category && (
                    <span className="rounded-sm border border-zinc-800 px-2 py-px text-xs text-zinc-600">
                      {category}
                    </span>
                  )}
                  {date && <span>{date}</span>}
                </span>
              </section>
            );
          })
        ) : (
          <span className="text-sm text-zinc-500">{error}</span>
        )}
      </div>
    </div>
  );
}
