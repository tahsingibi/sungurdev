import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function Write() {
  const { pages } = settings;
  const posts = (await getPosts()).slice(0, 3);
  const { path, heading, description } = pages.write;

  return (
    <div className="flex flex-col relative">
      <Link href={path} className="group w-full flex flex-1 flex-col p-6">
        <h2 className="text-3xl">
          {heading}{" "}
          <ArrowUpRight className="inline scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all origin-left ml-auto" />
        </h2>
        <span className="font-pixel text-sm text-muted-foreground">
          {description}
        </span>
      </Link>

      {posts.length ? (
        <div className="mx-6 mb-6 overflow-hidden rounded-lg border border-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/write/${post.slug}`}
              className="flex flex-col gap-2 border-b border-border p-4 transition-colors last:border-b-0 hover:bg-accent/40"
            >
              <h3 className="truncate text-xl">{post.title}</h3>
              <span>
                <Badge variant="default" className="font-mono">
                  {post.category}
                </Badge>
                <Badge variant="ghost" className="pointer-events-auto">
                  {post.publishDate}
                </Badge>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="px-6 pb-6 text-foreground/75">{pages.write.error}</p>
      )}
    </div>
  );
}
