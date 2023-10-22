import { Post } from "@/.contentlayer/generated"
import { blogPosts as posts } from "@/utils/getPost";
import styles from './style.module.scss'
import Links from "@/components/links";
import formatDate from "@/utils/formatdate";

export default function Blog() {

  return (
    <>
      <h1>Write</h1>
      {!posts.length && <p>Henüz gönderi yayınlanmadı.</p>}
      {posts.map((post: Post) => (
        <Links href={post.url} key={post.url} className={styles.link} scroll={false}>
          {post.title}
          <div className={styles.info}>{post.category && post.category + ' •'} {formatDate(post.date)}</div>
        </Links>
      ))
      }
    </ >
  )
}
