import { PageHeader } from "@/components/custom/page-header";
import { Row, Rows } from "@/components/custom/section";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { Rss } from "lucide-react";
import Link from "next/link";

/** `2026-08-16` → `16 Aug 2026`. */
function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Yazı arşivi.
 *
 * Ana sayfadaki listenin tamamı. Tek farkı satırlarda başlığın altında
 * açıklamanın da olması: arşivde karar veriliyor, başlık tek başına
 * yetmiyor.
 *
 * Üstteki kategori dağılımı grafiği kaldırıldı — sayaç künyede zaten var ve
 * beş yazılık bir arşivde dağılım, listenin kendisinden daha fazlasını
 * söylemiyordu.
 */
export default async function WriteView() {
  const posts = await getPosts();
  const { heading, description, error } = settings.pages.write;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading={heading}
        description={description}
        // Sayaçlar sitede hep iki hane.
        meta={`${String(posts.length).padStart(2, "0")} posts`}
        action={
          <Link
            href="/rss.xml"
            aria-label="RSS"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Rss aria-hidden className="size-4" />
          </Link>
        }
      />

      {posts.length ? (
        <Rows>
          {posts.map((post) => (
            <Row
              key={post.slug}
              href={`/write/${post.slug}`}
              title={post.title}
              subtitle={
                <span className="flex flex-col gap-1">
                  {post.description ? (
                    <span className="line-clamp-2">{post.description}</span>
                  ) : null}
                  <span className="inline-flex items-center gap-2">
                    <span className="rounded-sm border border-border px-1.5 py-px font-mono text-2xs lowercase">
                      {post.category}
                    </span>
                    <time dateTime={post.publishDate}>
                      {formatDate(post.publishDate)}
                    </time>
                  </span>
                </span>
              }
            />
          ))}
        </Rows>
      ) : (
        <p className="text-sm text-muted-foreground">{error}</p>
      )}
    </div>
  );
}
