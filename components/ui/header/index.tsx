import React from 'react'
import Links from '../links'
import styles from './style.module.scss'
import db from '@/db.json'

export default function Header() {
    const { nav } = db;
    return (
        <header className={styles.header}>
            {nav.map(page => <Links href={page.path} scroll={false} key={page.id}>{page.name}</Links>)}
        </header>
    )
}
