import React, { ReactNode } from 'react'
import styles from './style.module.scss'
import { clsx } from '@/utils'

export default function SidepageWrapper({ children, title, inPost }: { children: ReactNode, title: string, inPost: boolean }) {
    return (
        <aside className={clsx([styles.sidepage, inPost ? styles.inPost : ''])}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.wrap}>
                {children}
            </div>
        </aside>
    )
}

