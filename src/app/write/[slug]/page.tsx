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
    <div className="flex flex-col gap-8">
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
        className="flex flex-wrap items-center gap-2"
        aria-label="Article actions"
      >
        <BackButton
          variant="ghost"
          size="icon-sm"
          aria-label="Back to blog"
          className="-ml-1.5"
        />
        <span className="ml-auto" />
        <ArticleActions
          title={post.title}
          canonicalUrl={post.canonicalUrl}
          markdownUrl={post.markdownUrl}
          githubUrl={post.githubUrl}
        />
      </nav>
      <article className="flex flex-col gap-8">
        <ArticleHeader
          category={post.category}
          date={post.publishDate}
          readingMinutes={readingMinutes}
          title={post.title}
          description={post.description}
        />

        {/*
          Gövde `text-base` ve daha açık bir renk: `text-sm` + muted, uzun
          okumada gözü yoruyordu. Kolon zaten okuma genişliğinde, o yüzden
          metne ayrıca yatay dolgu verilmiyor.
        */}
        <div className="text-base leading-8 text-foreground/80">
          <post.Content />
        </div>
      </article>

      {/* Komşu yazılar: okuma bittiğinde çıkış yolu. */}
      {newer || older ? (
        <nav
          aria-label="Nearby posts"
          className="-mx-3 flex flex-col border-t border-border pt-4"
        >
          {[
            { post: older, label: "older" },
            { post: newer, label: "newer" },
          ].map(({ post: neighbour, label }) =>
            neighbour ? (
              <Link
                key={label}
                href={`/write/${neighbour.slug}`}
                className="flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-accent/70"
              >
                <span className="font-mono text-2xs lowercase text-muted-foreground">
                  {label}
                </span>
                <span className="text-sm leading-snug text-foreground">
                  {neighbour.title}
                </span>
              </Link>
            ) : null,
          )}
        </nav>
      ) : null}
    </div>
  );
}
