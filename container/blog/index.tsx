import { Post } from "@/.contentlayer/generated"
import { blogPosts as posts } from "@/utils/getPost";
import SidepageWrapper from "@/components/sidepage";
import styles from './style.module.scss'
import Links from "@/components/navbar/navlink";
import formatDate from "@/utils/formatdate";

export default function Blog({ inPost }: { inPost: boolean }) {

  return (
    <SidepageWrapper title="Blog" inPost={inPost}>
      {posts.map((post: Post) => (
        <Links href={post.url} key={post.url} className={styles.link} scroll={false}>
          {post.title}
          <span> {formatDate(post.date)}</span>
        </Links>
      ))
      }
    </SidepageWrapper >
  )
}
