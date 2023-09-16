import { allPosts, Post } from "@/.contentlayer/generated"
import { compareDesc, format } from "date-fns"
import Link from "next/link";

export default async function Blog() {

  const posts = allPosts.slice().sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));


  return (
    <>
      <h2>Blog</h2>
      {posts.map((post: Post) => (
        <Link key={post.url} href={post.url}>
          {post.title}
          <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
        </Link>
      ))}
    </>
  )
}
