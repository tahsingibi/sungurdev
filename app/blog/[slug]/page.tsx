import { allPosts } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import MDXContainer from "@/components/mdxcontainer";

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = allPosts.find((post) => post.slug == params.slug)

    if (!post) return notFound()

    return <MDXContainer post={post} />
}