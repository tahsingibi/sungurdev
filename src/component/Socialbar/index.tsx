import Link from "next/link"
import styles from './socialbar.module.scss'
import { twitter, github, instagram, linkedin } from '@/src/lib/Icons'

export default function Social() {
    const links = [
        { icon: twitter, path: 'https://x.com/tahsingibi', name: 'Twitter' },
        { icon: github, path: 'https://github.com/tahsingibi', name: 'Github' },
        { icon: instagram, path: 'https://instagram.com/tahsingibi', name: 'Instagram' },
        { icon: linkedin, path: 'https://www.linkedin.com/in/tahsin-sungur/', name: 'LinkedIn' },
    ]
    return (
        <div className={styles.social}>
            {links.map(({ icon, path, name }: any) =>
                <Link href={path} key={name} target='_blank'>{icon}{name}</Link>
            )}
        </div>
    )
}