import ProfileCard from "@/components/custom/profile"
import styles from './style.module.scss'
import SocialSection from "./socials"
import Works from "./work"

const _content = {
  desc: `i'm a <b>frontend developer</b> based in izmir, and one of my past experiences includes working as a frontend developer at <a href="https://mallconomy.com">mallconomy</a>. currently, i'm in search of new opportunities and excited to continuously improve myself and engage in new projects.`,
  socials: [
    { id: 0, icon: "github", path: 'https://github.com/tahsingibi' },
    { id: 1, icon: "linkedin", path: 'https://www.linkedin.com/in/tahsin-sungur/' },
    { id: 2, icon: "twitter-x", path: 'https://x.com/tahsingibi' },
    { id: 3, icon: "envelope", path: 'mailto:mtahsinsungur@gmail.com' },
  ]
}

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.about}>
        <ProfileCard />
        <p dangerouslySetInnerHTML={{ __html: _content.desc }} />
        <SocialSection socials={_content.socials} />
      </div>
      <Works />
    </div>
  )
}
