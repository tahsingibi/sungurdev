import { notFound } from "next/navigation";
import MDXContainer from "@/components/custom/mdxcontainer";
import { getPost } from "@/utils";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = getPost(params.slug)
    return { title: post?.title + ' – Tahsin Sungur' }
}

export default function BlogPost({ params }: Readonly<{ params: { slug: string } }>) {
    const post = getPost(params.slug)

    if (!post) return notFound()

    return <MDXContainer post={post} />
}