import React from 'react'
import styles from './style.module.scss'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className={styles.footer}>sungur.dev &copy; {year}</footer>
    )
}
