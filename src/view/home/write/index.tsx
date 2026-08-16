import { PostList } from "@/components/custom/post-list";
import { SectionHeader } from "@/components/custom/section-header";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";

export default async function Write() {
  const { pages } = settings;
  const allPosts = await getPosts();
  // Sayaç toplamı göstermeli; listede yalnızca son üçü var.
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
        <div className="px-6 pb-8">
          <PostList posts={posts} />
        </div>
      ) : (
        <p className="px-6 pb-8 text-xs text-muted-foreground">{pages.write.error}</p>
      )}
    </section>
  );
}
