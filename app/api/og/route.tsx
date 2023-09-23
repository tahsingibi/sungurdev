import OpenGraph from "@/components/ogp/ogp";
import { ImageResponse } from "next/server";

export function GET() {

    return new ImageResponse(<OpenGraph />)
}