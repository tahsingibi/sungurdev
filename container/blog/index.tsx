import { Post } from "@/.contentlayer/generated"
import { blogPosts as posts } from "@/utils/getPost";
import styles from './style.module.scss'
import Links from "@/components/ui/links";
import { formatDate } from "@/utils";

const content = {
  title: "write",
  notfound: "not yet published."
}

export default function Blog() {

  return (
    <>
      <h1>{content.title}</h1>
      <p className="description">Kullandığım ekipmanlar ve yazılımlar. Yenileri geldikçe güncelleyeceğim</p>
      {!posts.length && <p>{content.notfound}</p>}
      <div className={styles.list}>
        {posts.map((post: Post) => (
          <Links href={post.url} key={post.url} className={styles.link} scroll={false}>
            {post.title}
            <div className={styles.info}>{post.category && post.category + ' •'} {formatDate(post.date)}</div>
          </Links>
        ))
        }
      </div>
    </>
  )
}
