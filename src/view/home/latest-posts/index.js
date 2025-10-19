import { getPostsStore } from "@/src/lib/store/posts-store";
import Link from "next/link";
import Heading from "../block-heading";

export default async function LatestPosts() {
  const { latest } = await getPostsStore();
  const latestPosts = latest;

  if (!latestPosts.length) {
    return null;
  }

  return (
    <section className="grid gap-2">
      <Heading id="latest-posts">
        latest notes{" "}
        <Heading.Link href="/write">
          see all
        </Heading.Link>
      </Heading>
      <ul className="flex flex-col">
        {latestPosts?.map((post) => {
          const { title, category, date } = post?.metadata;
          return (
            <Link
              href={`/write/${post?.slug}`}
              className="flex flex-col gap-1 rounded-lg p-4 transition-colors hover:bg-zinc-900/25"
              key={post?.slug}
            >
              <span className="text-md w-fit">{title}</span>
              <span className="inline-flex items-center gap-2 text-sm text-zinc-600">
                {category && (
                  <span className="rounded-sm border border-zinc-800 px-2 py-px text-xs text-zinc-600">
                    {category}
                  </span>
                )}
                {date && <span>{date}</span>}
              </span>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
