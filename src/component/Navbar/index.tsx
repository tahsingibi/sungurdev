import styles from './navbar.module.scss'
import { home, hand, pencil, beaker } from '@/src/lib/Icons'
import { SidebarLink } from '../Elements'
import clsx from '@/src/lib/clsx'
export default function Navbar() {

    const navbar = [
        { icon: home, path: '/', name: 'Anasayfa' },
        { icon: hand, path: '/about', name: 'Hakkımda' },
        { icon: pencil, path: '/blog', name: 'Blog' },
        { icon: beaker, path: '/project', name: 'Projeler' },
    ]

    return (
        <nav className={styles.navbar}>
            {navbar.map(({ path, name, icon }: any) => (
                <SidebarLink href={path} key={path}>{icon} {name}</SidebarLink>
            ))}
        </nav>
    )
}