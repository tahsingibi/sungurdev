import { Panel } from "@/components/custom/panel";
import { PostCard } from "@/components/custom/post-card";
import { PostIndex } from "@/components/custom/post-index";
import { SectionHeader } from "@/components/custom/section-header";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import Link from "next/link";

/**
 * Blog bandı — dizin şeridi + kartlar.
 *
 * Deneyim bölümüyle aynı ritim: üstte bölümü tek bakışta özetleyen bir
 * panel, altında okunacak kayıtlar. Dizin sağda dar bir raydayken sayı ile
 * çubukları arasında boşluk kalıyor, yazılar da sıkışıyordu; yatay şeride
 * dönünce üç kart eşit genişlikte tam sıraya giriyor.
 */
export default async function Write() {
  const { pages } = settings;
  const allPosts = await getPosts();
  // Sayaçlar ve dağılım toplamı göstermeli; kartlarda yalnızca son üçü var.
  const posts = allPosts.slice(0, 3);
  const { path, heading, description } = pages.write;

  return (
    <section className="relative flex flex-col">
      <SectionHeader
        heading={heading}
        description={description}
        href={path}
        meta={`${allPosts.length} posts`}
      />

      {posts.length ? (
        <div className="flex flex-col gap-4 px-6 pb-8">
          <Panel
            label="index"
            action={
              <Link
                href={path}
                className="text-2xs text-muted-foreground transition-colors hover:text-primary"
              >
                archive →
              </Link>
            }
          >
            <PostIndex posts={allPosts} />
          </Panel>

          <div className="grid gap-4 sm:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                /* Kayıt numarası kırpılmış listeye göre değil, arşivdeki
                   gerçek sırasına göre. */
                record={`log_${String(allPosts.length - index).padStart(2, "0")}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="px-6 pb-8 text-xs text-muted-foreground">
          {pages.write.error}
        </p>
      )}
    </section>
  );
}
