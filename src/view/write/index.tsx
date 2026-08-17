import { Panel } from "@/components/custom/panel";
import { PostCard } from "@/components/custom/post-card";
import { PostIndex } from "@/components/custom/post-index";
import { SectionHeader } from "@/components/custom/section-header";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { Rss } from "lucide-react";
import Link from "next/link";

/**
 * Yazı arşivi.
 *
 * Ana sayfadaki blog bandının tamamı: aynı dizin şeridi (bütün sayılar
 * zaten oradan geliyordu), altında bütün yazılar. Kartlar burada iki
 * sütunda ve açıklamalı — arşive giren okur hangi yazıya gireceğine karar
 * veriyor, başlık tek başına yetmiyor.
 */
export default async function WriteView() {
  const posts = await getPosts();
  const { heading, description, error } = settings.pages.write;

  return (
    <div className="flex flex-col">
      <SectionHeader
        heading={heading}
        description={description}
        level="h1"
        meta={`${posts.length} posts`}
        action={
          <Link
            href="/rss.xml"
            className="inline-flex shrink-0 items-center gap-1.5 border border-border px-2 py-1 text-2xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <Rss aria-hidden className="size-3" />
            rss
          </Link>
        }
      />

      {posts.length ? (
        <div className="flex flex-col gap-4 px-6 pb-8">
          <Panel label="index">
            <PostIndex posts={posts} />
          </Panel>

          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                record={`log_${String(posts.length - index).padStart(2, "0")}`}
                showDescription
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="px-6 pb-8 text-xs text-muted-foreground">{error}</p>
      )}
    </div>
  );
}
