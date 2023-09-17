import React, { ReactNode } from 'react'
import styles from './style.module.scss'

export default function SidepageWrapper({ children, title }: { children: ReactNode, title: string }) {
    return (
        <aside className={styles.sidepage}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.wrap}>
                {children}
            </div>
        </aside>
    )
}

