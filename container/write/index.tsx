import { Post } from "@/.contentlayer/generated"
import { blogPosts as posts } from "@/utils/getPost";
import styles from './style.module.scss'
import Links from "@/components/ui/links";
import { formatDate } from "@/utils";

const content = {
  title: "write",
  description: "blog posts and short notes",
  notfound: "not yet published."
}

export default function WriteContainer() {

  return (
    <>
      <h1>{content.title}</h1>
      <p className="description">{content.description}</p>
      <hr />
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
