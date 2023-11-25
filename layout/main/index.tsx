import React, { ReactNode } from 'react'
import styles from './style.module.scss'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className={styles.container}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
