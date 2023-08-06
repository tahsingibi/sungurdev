import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import picProfile from '@/src/asset/img/profile.jpg'
import styles from './profilecard.module.scss'

export default function ProfileCard() {
    return (
        <Link className={styles.card} href="/">
            <figure className={styles.img}>
                <Image src={picProfile} alt="Tahsin Sungur" fill />
            </figure>
            <div className={styles.content}>
                <h2 className={styles.title}>Tahsin Sungur</h2>
                <p className={styles.description}>Frontend Developer</p>
            </div>
        </Link>
    )
}