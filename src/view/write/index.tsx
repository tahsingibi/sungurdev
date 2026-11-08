import { PageHeader } from "@/components/custom/page-header";
import { PostMeta } from "@/components/custom/post-meta";
import { Row, Rows } from "@/components/custom/section";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { Rss } from "lucide-react";
import Link from "next/link";

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
            href={settings.routes.rss}
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
              href={post.path}
              title={post.title}
              subtitle={
                <span className="flex flex-col gap-2">
                  <PostMeta date={post.publishDate} category={post.category} />
                  {post.description ? (
                    <span className="line-clamp-2">{post.description}</span>
                  ) : null}
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
