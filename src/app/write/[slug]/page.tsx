import { ArticleActions } from "@/components/custom/article-actions";
import BackButton from "@/components/custom/back-button";
import { ArticleHeader } from "@/components/custom/page-header";
import { getPost, getPosts, postToPlainText } from "@/lib/posts";
import settings from "@/lib/settings";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: [post.category, ...settings.keywords],
    alternates: { canonical: post.canonicalUrl },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: post.canonicalUrl,
      publishedTime: post.publishDate,
      authors: [settings.name],
      tags: [post.category],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  /*
   * Okuma süresi ve komşu yazılar gerçek veriden.
   *
   * Süre için 200 kelime/dakika alındı — teknik metinlerde yaygın kabul.
   * Komşular dizindeki sıradan geliyor: yazı bitince okuyucuyu boşluğa
   * bırakmak yerine bir sonraki adımı göstermek gerekiyordu.
   */
  const words = postToPlainText(post).trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(words / 200));

  const posts = await getPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: post.canonicalUrl,
    articleBody: postToPlainText(post),
    author: { "@type": "Person", name: settings.name, url: settings.url },
    publisher: { "@type": "Person", name: settings.name, url: settings.url },
  };

  return (
    <div className="relative flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/*
        Tek satır, sığmazsa alt satıra. `justify-between` yerine `gap` +
        `ml-auto`: dar ekranda aralarında kocaman boşluk kalmasın, sarınca da
        eylemler sola hizalansın.
      */}
      <nav
        className="flex flex-wrap items-center gap-2 border-b border-border px-6 py-4"
        aria-label="Article actions"
      >
        <BackButton
          text="blog"
          variant="outline"
          size="sm"
          className="text-xs uppercase tracking-[0.16em]"
        />
        <span className="ml-auto" />
        <ArticleActions
          title={post.title}
          canonicalUrl={post.canonicalUrl}
          markdownUrl={post.markdownUrl}
          githubUrl={post.githubUrl}
        />
      </nav>
      <article>
        <ArticleHeader
          // Arşivdeki kartla aynı kayıt numarası: aynı yazı, aynı künye.
          record={`log_${String(posts.length - index).padStart(2, "0")}`}
          category={post.category}
          date={post.publishDate}
          readingMinutes={readingMinutes}
          title={post.title}
          description={post.description}
        />

        {/*
          Gövde `text-base` ve daha açık bir renk: `text-sm` + muted, uzun
          okumada gözü yoruyordu. Yatay dolgu burada dar tutulup metin
          bloklarına ayrıca veriliyor (bkz. PROSE_INSET) — böylece kod ve
          görseller daha geniş kalıyor.
        */}
        <div className="px-6 py-12 text-base leading-8 text-foreground/80 sm:px-8">
          <post.Content />
        </div>
      </article>

      {/* Komşu yazılar: okuma bittiğinde çıkış yolu. */}
      {newer || older ? (
        <nav
          aria-label="Nearby posts"
          className="grid gap-px border-t border-border bg-border sm:grid-cols-2"
        >
          {[
            { post: older, label: "older" },
            { post: newer, label: "newer" },
          ].map(({ post: neighbour, label }) =>
            neighbour ? (
              <Link
                key={label}
                href={`/write/${neighbour.slug}`}
                className="group flex flex-col gap-1.5 bg-background px-6 py-5 transition-colors hover:bg-primary/[0.04]"
              >
                <span className="text-2xs uppercase tracking-[0.3em] text-muted-foreground">
                  {label}
                </span>
                <span className="text-xs leading-snug transition-colors group-hover:text-primary">
                  {neighbour.title}
                </span>
              </Link>
            ) : (
              <span key={label} className="hidden bg-background sm:block" />
            ),
          )}
        </nav>
      ) : null}
    </div>
  );
}
