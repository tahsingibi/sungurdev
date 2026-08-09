import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { ArrowUpRight, Rss } from "lucide-react";
import Link from "next/link";

export default async function WriteView() {
  const posts = await getPosts();
  const { heading, description, error } = settings.pages.write;

  return (
    <div className="relative flex flex-col">
      <header className="flex max-sm:flex-col sm:items-end sm:justify-between gap-4 p-6">
        <div className="flex min-w-0 flex-col">
          <h1 className="text-3xl">{heading}</h1>
          <p className="font-pixel text-sm upp text-zinc-400">{description}</p>
        </div>

        <Button
          asChild
          variant="ghost"
          size="xs"
          className="font-mono text-2xs! uppercase w-fit"
        >
          <Link href="/rss.xml">
            <Rss aria-hidden="true" />
            RSS
          </Link>
        </Button>
      </header>

      <div className="divider-screen" aria-hidden="true" />

      {posts.length ? (
        <ol>
          {posts.map((post, index) => (
            <li key={post.slug} className="relative">
              <Link
                href={`/write/${post.slug}`}
                className="group flex flex-col gap-4 p-6 transition-colors hover:bg-accent/40 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <h2 className="text-xl">
                    {post.title}
                    <ArrowUpRight className="ml-1 inline size-4 origin-left scale-0 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-pixel text-xs upp text-muted-foreground">
                    <Badge variant="secondary" className="font-mono">
                      {post.category}
                    </Badge>
                    <Badge variant="ghost" className="pointer-events-auto">
                      {post.publishDate}
                    </Badge>
                  </div>
                </div>

                <span className="shrink-0 font-pixel text-[10px] upp text-muted-foreground">
                  {`POST_${String(posts.length - index).padStart(2, "0")}`}
                </span>
              </Link>
              <div className="divider-b" aria-hidden="true" />
            </li>
          ))}
        </ol>
      ) : (
        <p className="p-6 text-sm text-muted-foreground">{error}</p>
      )}
    </div>
  );
}
