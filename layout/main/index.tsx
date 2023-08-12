import React, { ReactNode } from 'react'
import styles from './main.module.scss'
import Sidebar from '../../component/Sidebar'
import { MobileNav } from '../../component/Elements'

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <main className={styles.main}>
            <MobileNav />
            <Sidebar />
            {children}
        </main>
    )
}
