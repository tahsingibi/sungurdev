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
    <section>
      <Heading id="latest-posts">
        latest notes{" "}
        <Heading.Link href="/write">
          see all
        </Heading.Link>
      </Heading>
      <ul className="flex flex-col px-2 py-5 sm:px-6">
        {latestPosts?.map((post) => {
          const { title, category, date } = post?.metadata;
          return (
            <li key={post?.slug}>
              <Link
                href={`/write/${post?.slug}`}
                className="group flex flex-col gap-2 p-4 transition-colors hover:bg-accent/60"
              >
                <span className="w-fit text-foreground transition-colors">{title}</span>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                  {category && (
                    <span className="border border-border px-2 py-px text-[10px] uppercase tracking-wider text-muted-foreground">
                      {category}
                    </span>
                  )}
                  {date && <span>{date}</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
