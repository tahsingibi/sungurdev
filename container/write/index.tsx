import { Post } from "@/.contentlayer/generated"
import { blogPosts as posts } from "@/utils/getPost";
import Links from "@/components/ui/links";
import { formatDate } from "@/utils";

const content = {
  title: "write",
  description: "blog posts and short notes",
  notfound: "not yet published."
}

export default function WriteContainer() {

  return (
    <>
      <h1>{content.title}</h1>
      <p className="description">{content.description}</p>
      <hr />
      {!posts.length && <p>{content.notfound}</p>}
      <div className="grid gap-8">
        {posts.map((post: Post) => (
          <Links href={post.url} key={post.url} className="grid gap-0.5 no-underline" scroll={false}>
            {post.title}
            <div className="text-zinc-400 font-normal">{post.category && post.category + ' •'} {formatDate(post.date)}</div>
          </Links>
        ))
        }
      </div>
    </>
  )
}
