import { PostList } from "@/components/custom/post-list";
import { SectionHeader } from "@/components/custom/section-header";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { Rss } from "lucide-react";
import Link from "next/link";

export default async function WriteView() {
  const posts = await getPosts();
  const { heading, description, error } = settings.pages.write;

  return (
    <div className="relative flex flex-col">
      <SectionHeader
        heading={heading}
        description={description}
        level="h1"
        action={
          <Button
            asChild
            variant="secondary"
            size="xs"
            className="w-fit"
          >
            <Link href="/rss.xml">
              <Rss aria-hidden="true" />
              RSS
            </Link>
          </Button>
        }
      />

      {posts.length ? (
        <PostList posts={posts} showDescription />
      ) : (
        <p className="p-6 text-sm text-muted-foreground">{error}</p>
      )}
    </div>
  );
}
