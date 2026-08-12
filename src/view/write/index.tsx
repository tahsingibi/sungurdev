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
          <p className="font-pixel text-sm text-muted-foreground">{description}</p>
        </div>

        <Button
          asChild
          variant="secondary"
          size="xs"
          className="font-mono text-2xs! uppercase w-fit"
        >
          <Link href="/rss.xml">
            <Rss aria-hidden="true" />
            RSS
          </Link>
        </Button>
      </header>

      {posts.length ? (
        <ol className="mx-6 mb-6 overflow-hidden rounded-lg border border-border">
          {posts.map((post, index) => (
            <li key={post.slug} className="border-b border-border last:border-b-0">
              <Link
                href={`/write/${post.slug}`}
                className="group flex flex-col gap-4 p-4 transition-colors hover:bg-accent/40 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <h2 className="text-xl">
                    {post.title}
                    <ArrowUpRight className="ml-1 inline size-4 origin-left scale-0 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
                  </h2>

                  <p className="mt-2 line-clamp-1 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-pixel text-xs text-muted-foreground">
                    <Badge variant="secondary" className="font-mono">
                      {post.category}
                    </Badge>
                    <Badge variant="ghost" className="pointer-events-auto">
                      {post.publishDate}
                    </Badge>
                  </div>
                </div>

                <span className="shrink-0 font-pixel text-[10px] text-muted-foreground">
                  {`POST_${String(posts.length - index).padStart(2, "0")}`}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="p-6 text-sm text-muted-foreground">{error}</p>
      )}
    </div>
  );
}
