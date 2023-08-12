import React, { ReactNode } from 'react'
import styles from './blog.module.scss'
import { Heading } from '../../component/Elements'
import BlogList from '@/component/Elements/BlogList'

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.main}>
            <aside className={styles.list}>
                <Heading>Blog</Heading>
                <BlogList />
            </aside>
            <div className="container">
                {children}
            </div>
        </div>
    )
}
