import { ArticleActions } from "@/components/custom/article-actions";
import BackButton from "@/components/custom/back-button";
import { SectionHeader } from "@/components/custom/section-header";
import { Badge } from "@/components/ui/badge";
import { getPost, getPosts, postToPlainText } from "@/lib/posts";
import settings from "@/lib/settings";
import type { Metadata } from "next";
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
      <nav
        className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 p-6"
        aria-label="Article actions"
      >
        <BackButton text="Blog" />
        <ArticleActions
          title={post.title}
          canonicalUrl={post.canonicalUrl}
          markdownUrl={post.markdownUrl}
          githubUrl={post.githubUrl}
        />
      </nav>
      <article>
        <SectionHeader
          level="h1"
          size="lg"
          bordered
          heading={post.title}
          description={post.description}
          eyebrow={
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="accent">{post.category}</Badge>
              <time
                dateTime={post.publishDate}
                className="font-pixel text-xs text-muted-foreground"
              >
                {post.publishDate}
              </time>
            </div>
          }
        />

        <div className="p-6 text-base leading-7 text-foreground/75 sm:p-8">
          <post.Content />
        </div>
      </article>
    </div>
  );
}
