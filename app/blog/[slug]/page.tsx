import { notFound } from "next/navigation";
import MDXContainer from "@/components/mdxcontainer";
import getPost from "@/utils/getPost";
import Blog from "@/container/blog";
import SidepageLayout from "@/layout/SidepageLayout";

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPost(params.slug)

    if (!post) return notFound()

    return (
        <SidepageLayout>
            <MDXContainer post={post} />
        </SidepageLayout>
    )
}