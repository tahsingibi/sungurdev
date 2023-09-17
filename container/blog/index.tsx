"use client"
import { Post } from "@/.contentlayer/generated"
import { format } from "date-fns"
import Link from "next/link";
import { blogPosts as posts } from "@/utils/getPost";
import SidepageWrapper from "@/components/sidepage";
import styles from './style.module.scss'
import { clsx } from "@/utils";
import isActivePage from "@/utils/isActivePage";
import Links from "@/components/navbar/navlink";

export default function Blog() {

  return (
    <SidepageWrapper title="Blog">
      {posts.map((post: Post) => (
        <Links href={post.url} key={post.url} className={styles.link}>
          {post.title}
          <span> {format(new Date(post.date), 'MMMM dd, yyyy')}</span>
        </Links>
      ))
      }
    </SidepageWrapper >
  )
}
