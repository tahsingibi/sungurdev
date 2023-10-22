import { ImageResponse } from 'next/server'
import OpenGraph from '@/components/ogp/ogp'
import getPost from '@/utils/getPost'


export const runtime = 'edge'

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {

    const post = getPost(params?.slug)

    return new ImageResponse(<OpenGraph title={post?.title} category={post?.category} />)
}