import { PostList } from "@/components/custom/post-list";
import { SectionHeader } from "@/components/custom/section-header";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";

export default async function Write() {
  const { pages } = settings;
  const posts = (await getPosts()).slice(0, 3);
  const { path, heading, description } = pages.write;

  return (
    <section className="relative flex flex-col">
      <SectionHeader heading={heading} description={description} href={path} />

      {posts.length ? (
        <PostList posts={posts} />
      ) : (
        <p className="px-6 pb-6 text-foreground/75">{pages.write.error}</p>
      )}
    </section>
  );
}
