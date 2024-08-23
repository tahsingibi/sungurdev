import { BSIcons } from '@/utils'
import Link from 'next/link'
import db from '@/db.json'

export default function SocialSection() {

    return (
        <div className={"flex gap-1"}>
            {db.socials?.map((social) => <Link className="text-zinc-400 rounded px-3 py-1 flex gap-3 items-center justify-center
      transition-all duration-100 hover:bg-zinc-900/60
      active:translate-y-0.5 aspect-square" href={social.path} key={social.id} target='blank'><BSIcons icon={social.icon} /></Link>)}
            {db.jobSeeking && !!db.resume && <Link className="text-zinc-400 rounded px-3 py-1 flex gap-3 items-center justify-center
      transition-all duration-100 hover:bg-zinc-900/60
      active:translate-y-0.5  aspect-auto no-underline" href={db.resume} target='blank'>Resume <BSIcons icon="download" /> </Link>}
        </div>
    )
}