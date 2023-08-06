import React, { ReactNode } from 'react'
import styles from './blog.module.scss'
import Sidebar from '../../component/Sidebar'
import { MobileNav } from '../../component/Elements'

export default function BlogTemplate({ children }: { children: ReactNode }) {
    return (
        <body>
            <main className={styles.main}>
                <MobileNav />
                <Sidebar />
                <div className={styles.container}>
                    {children}
                </div>
            </main>
        </body>
    )
}
