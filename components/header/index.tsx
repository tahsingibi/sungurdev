import React from 'react'
import Links from '../links'
import styles from './style.module.scss'

export default function Header() {
    return (
        <header className={styles.header}>
            <Links href='/' scroll={false}>home</Links>
            <Links href='/tools' scroll={false}>tools</Links>
            <Links href='/write' scroll={false}>write</Links>
        </header>
    )
}
