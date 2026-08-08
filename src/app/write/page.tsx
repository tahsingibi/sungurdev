import Link from "next/link";
import type { Metadata } from "next";
import settings from "@/lib/settings";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Yazılar",
  description: settings.pages.write.description,
  alternates: {
    canonical: "/write",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: "sungur.dev RSS" }] },
  },
};

export default async function WritePage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16">
      <header className="mb-10 flex items-end justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Yazılar</h1>
          <p className="mt-2 text-muted-foreground">{settings.pages.write.description}</p>
        </div>
        <a href="/rss.xml" className="text-sm underline underline-offset-4">RSS</a>
      </header>

      {posts.length ? (
        <ol className="divide-y">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/write/${post.slug}`} className="grid gap-2 py-6 hover:opacity-70 sm:grid-cols-[8rem_1fr_auto] sm:items-start">
                <time dateTime={post.publishDate} className="font-mono text-xs text-muted-foreground">{post.publishDate}</time>
                <span>
                  <strong className="font-medium">{post.title}</strong>
                  <span className="mt-1 block text-sm text-muted-foreground">{post.description}</span>
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground">{post.category}</span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p>{settings.pages.write.error}</p>
      )}
    </main>
  );
}
