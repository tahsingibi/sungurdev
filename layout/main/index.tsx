import Header from '@/components/header'
import React, { ReactNode } from 'react'
import styles from './style.module.scss'

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.container}>
            <Header />
            {children}
        </div>
    )
}
