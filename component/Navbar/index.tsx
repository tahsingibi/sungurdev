import styles from './navbar.module.scss'
import { home, hand, pencil } from '@/utils'
import { Links } from '../Elements'
export default function Navbar() {

    const navbar = [
        { icon: home, path: '/', name: 'Anasayfa' },
        { icon: hand, path: '/about', name: 'Hakkımda' },
        { icon: pencil, path: '/blog', name: 'Blog' },
        // { icon: beaker, path: '/project', name: 'Projeler' },
    ]

    return (
        <nav className={styles.navbar}>
            {navbar.map(({ path, name, icon }: any) => (
                <Links href={path} key={path}>{icon} {name}</Links>
            ))}
        </nav>
    )
}