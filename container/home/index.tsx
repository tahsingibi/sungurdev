import ProfileCard from "@/components/custom/profile"
import SocialSection from "./socials"
import Works from "./work"
import db from '@/db.json'

export default function Home() {

  const about = db.about.replaceAll("{lastwork}", db.works[0].name).replaceAll("{lastworklink}", db.works[0].path)

  return (
    <div className="py-4 grid gap-4">
      <div className="grid gap-2">
        <ProfileCard />
        <p dangerouslySetInnerHTML={{ __html: about }} />
        <SocialSection />
      </div>
      <Works />
    </div>
  )
}
