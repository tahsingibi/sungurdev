import OpenGraph from "@/components/ui/ogp/ogp";
import { ImageResponse } from 'next/og'

export function GET() {
    return new ImageResponse(<OpenGraph />)
}