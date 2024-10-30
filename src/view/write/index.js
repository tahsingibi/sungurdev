import db from '@/db';
import posts from '@/src/lib/get-posts';
import Link from 'next/link';

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
          posts.map((post) => {
            const { title, category, date } = post.metadata;
            return (
              <section
                className="flex flex-col gap-1 p-4 hover:bg-zinc-900/25 rounded-lg"
                key={post.slug}
              >
                <Link href={`/write/${post.slug}`} className="text-xl w-fit">
                  {title}
                </Link>
                <span className="text-zinc-600 inline-flex gap-2 items-center">
                  {category && (
                    <span className="text-zinc-600 px-2 text-xs py-px border border-zinc-800 w-fit rounded">
                      {category}
                    </span>
                  )}
                  {date && <span>{date}</span>}{' '}
                </span>
              </section>
            );
          })
        ) : (
          <span>{error}</span>
        )}
      </div>
    </div>
  );
}
