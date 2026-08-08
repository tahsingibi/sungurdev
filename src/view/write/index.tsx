import { getPostsStore } from '@/src/lib/store/posts-store';
import db from '@/src/settings';
import Link from 'next/link';
import SectionSeparator from '@/src/components/section-separator';

export default async function WriteView() {
  const { heading, description, error } = db.pages.write;
  const { all: posts } = await getPostsStore();

  return (
    <div className="flex flex-col">
      <header className="flex flex-col gap-3 px-6 py-12 sm:px-10 sm:py-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">Archive / Notes</span>
        <h1 className="text-4xl font-medium tracking-[-0.04em] text-white">{heading}</h1>
        <p className="max-w-lg text-sm leading-6 text-zinc-400">{description}</p>
      </header>
      <SectionSeparator />

      <div className="flex flex-col px-2 py-6 sm:px-6">
        {posts.length ? (
          posts.map((post) => {
            const { title, category, date } = post.metadata;
            return (
              <section
                className="group flex flex-col gap-2 p-4 transition-colors hover:bg-zinc-900/50"
                key={post.slug}
              >
                <Link href={`/write/${post.slug}`} className="w-fit text-lg text-zinc-300 group-hover:text-white">
                  {title}
                </Link>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  {category && (
                    <span className="border border-zinc-800 px-2 py-px text-[10px] uppercase tracking-wider text-zinc-400">
                      {category}
                    </span>
                  )}
                  {date && <span>{date}</span>}
                </span>
              </section>
            );
          })
        ) : (
          <span className="text-sm text-zinc-400">{error}</span>
        )}
      </div>
      <SectionSeparator />
    </div>
  );
}
