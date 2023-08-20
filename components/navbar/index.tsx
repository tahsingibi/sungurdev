import { Links } from '..'
import styles from './navbar.module.scss'
import { home as homeIcon, hand as handIcon, pencil as blogIcon } from '@/utils'

interface PathFace {
    name: string,
    path: string,
    icon: any
}

export const paths = [
    { name: 'Anasayfa', path: '/', icon: homeIcon },
    { name: 'Hakkımda', path: '/about', icon: handIcon },
    { name: 'Blog', path: '/#', icon: blogIcon },
    // { name: 'Hakkımda', path: '/about', icon: handIcon },
]

export function Navbar() {
    return (
        <nav className={styles.nav}>
            {paths.map(({ name, path, icon }: PathFace, i) => (
                <Links key={i} href={path} customClass={[styles.link]}>{icon} {name}</Links>
            ))}
        </nav>
    )
}
