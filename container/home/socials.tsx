import { Icons } from '@/utils'
import styles from './style.module.scss'
import Link from 'next/link'

type LinkType = {
    id: number,
    icon: string,
    path: string
}

export default function SocialSection({ socials }: Readonly<{ socials: Array<LinkType> }>) {

    return (
        <div className={styles.socials}>
            {socials?.map((social) => <Link href={social.path} key={social.id} target='blank'><Icons icon={social.icon} /></Link>)}
        </div>
    )
}