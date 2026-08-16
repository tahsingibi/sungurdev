import { DotList, Panel, PanelField } from "@/components/custom/panel";
import { PostList } from "@/components/custom/post-list";
import { SectionHeader } from "@/components/custom/section-header";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { Rss } from "lucide-react";
import Link from "next/link";

export default async function WriteView() {
  const posts = await getPosts();
  const { heading, description, error } = settings.pages.write;

  // Dizin bilgisi gerçek veriden: kaç yazı, en yenisi ne zaman, hangi konular.
  const latest = posts[0]?.publishDate;
  const categories = [...new Set(posts.map((post) => post.category))];

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
        <>
          {/*
            Dizin künyesi. Blogda beş yazı varken sayfanın yarısı boş
            kalıyordu; buradaki üç alan hem o boşluğu dolduruyor hem okurun
            gerçekten sorduğu şeyi cevaplıyor: ne kadar var, ne kadar taze,
            neyden bahsediyor.
          */}
          <div className="px-6 pb-6">
            <Panel label="index">
              <dl className="flex flex-col gap-2">
                <PanelField label="posts" labelWidth="w-20">
                  <span className="tnum">
                    {String(posts.length).padStart(2, "0")}
                  </span>
                </PanelField>
                {latest ? (
                  <PanelField label="latest" labelWidth="w-20">
                    <span className="tnum">{latest}</span>
                  </PanelField>
                ) : null}
                <PanelField label="topics" labelWidth="w-20">
                  <DotList items={categories} />
                </PanelField>
              </dl>
            </Panel>
          </div>

          <div className="px-6 pb-8">
            <PostList posts={posts} showDescription />
          </div>
        </>
      ) : (
        <p className="px-6 pb-8 text-xs text-muted-foreground">{error}</p>
      )}
    </div>
  );
}
