import { Logo, Navbar } from '..'
import styles from './sidebar.module.scss'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <Logo />
            <Navbar />
        </aside>
    )
}