import ProfileCard from "@/components/custom/profile"
import styles from './style.module.scss'
import SocialSection from "./socials"
import Works from "./work"
import db from '@/db.json'

export default function Home() {

  const about = db.about.replace("{lastwork}", db.works[0].name).replace("{lastworklink}", db.works[0].path)

  return (
    <div className={styles.home}>
      <div className={styles.about}>
        <ProfileCard />
        <p dangerouslySetInnerHTML={{ __html: about }} />
        <SocialSection />
      </div>
      <Works />
    </div>
  )
}
