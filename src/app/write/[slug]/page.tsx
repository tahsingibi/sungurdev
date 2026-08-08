import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleActions } from "@/components/custom/article-actions";
import { MarkdownDocument } from "@/components/custom/markdown-document";
import { getPost, getPosts, postToPlainText } from "@/lib/posts";
import settings from "@/lib/settings";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
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
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
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
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-5">
        <Link href="/write" className="text-sm text-muted-foreground hover:text-foreground">← Yazılar</Link>
        <ArticleActions
          title={post.title}
          canonicalUrl={post.canonicalUrl}
          markdownUrl={post.markdownUrl}
          githubUrl={post.githubUrl}
        />
      </div>
      <article>
        <header className="mb-12">
          <div className="mb-3 flex gap-3 font-mono text-xs uppercase text-muted-foreground">
            <span>{post.category}</span>
            <time dateTime={post.publishDate}>{post.publishDate}</time>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{post.description}</p>
        </header>
        <MarkdownDocument source={post.body} />
      </article>
    </main>
  );
}
