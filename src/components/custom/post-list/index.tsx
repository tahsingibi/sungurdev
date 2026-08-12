import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface PostListProps {
  posts: Post[];
  showDescription?: boolean;
}

export function PostList({ posts, showDescription = false }: PostListProps) {
  return (
    <ol className="mx-6 mb-6 overflow-hidden rounded-xl border border-border bg-card/40 shadow-soft">
      {posts.map((post, index) => (
        <li key={post.slug} className="group border-b border-border last:border-b-0">
          <Link
            href={`/write/${post.slug}`}
            className="grid gap-3 p-4 transition-colors hover:bg-secondary/60 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
          >
            <div className="min-w-0">
              <h3 className="truncate text-lg font-medium tracking-tight sm:text-xl">
                {post.title}
                <ArrowUpRight className="ml-1.5 inline size-4 text-muted-foreground opacity-35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
              </h3>

              {showDescription ? (
                <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              ) : null}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="accent">{post.category}</Badge>
                <time
                  dateTime={post.publishDate}
                  className="font-pixel text-xs text-muted-foreground"
                >
                  {post.publishDate}
                </time>
              </div>
            </div>

            <span className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-secondary-foreground max-sm:w-fit">
              {`POST_${String(posts.length - index).padStart(2, "0")}`}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
