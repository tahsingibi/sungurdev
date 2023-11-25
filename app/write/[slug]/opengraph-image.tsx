import { ImageResponse } from 'next/og'
import OpenGraph from '@/components/ui/ogp/ogp'
import { getPost } from '@/utils'

export const runtime = 'edge'

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {

    const post = getPost(params?.slug)

    return new ImageResponse(<OpenGraph title={post?.title} category={post?.category} />)
}