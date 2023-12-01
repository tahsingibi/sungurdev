import { BSIcons } from '@/utils'
import styles from './style.module.scss'
import Link from 'next/link'
import db from '@/db.json'

export default function SocialSection() {

    return (
        <div className={styles.socials}>
            {db.socials?.map((social) => <Link href={social.path} key={social.id} target='blank'><BSIcons icon={social.icon} /></Link>)}
            {db.jobSeeking && !!db.resume && <Link href={db.resume} target='blank' className={styles.resume}>Resume <BSIcons icon="download" /> </Link>}
        </div>
    )
}