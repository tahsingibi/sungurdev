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
        <span className="font-pixel text-sm upp text-zinc-400">
          {description}
        </span>
      </Link>
      <div className="divider-screen" aria-hidden="true" />

      {posts.length ? (
        posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/write/${post.slug}`}
            className="flex flex-col gap-2 p-6 hover:bg-accent/50 border-b last:border-b-0"
          >
            <h3 className="truncate text-xl">{post.title}</h3>
            <span>
              <Badge variant="secondary" className="font-mono">
                {post.category}
              </Badge>
              <Badge variant="ghost" className="pointer-events-auto">
                {post.publishDate}
              </Badge>
            </span>
          </Link>
        ))
      ) : (
        <p className="px-6 pb-6 text-foreground/75">{pages.write.error}</p>
      )}
    </div>
  );
}
