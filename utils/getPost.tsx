import { allPosts } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"

export const blogPosts = allPosts.slice().sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

export default function getPost(param: string) {
    return blogPosts.find((post) => post.slug == param) || null
}