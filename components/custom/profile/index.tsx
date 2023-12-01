import React from 'react'
import Image from 'next/image'
import styles from './style.module.scss'
import db from '@/db.json'


export default function ProfileCard() {
    return (
        <div className={styles.profile}>
            <figure className={styles.image}>
                <Image src={db.image} alt={db.name} width={200} height={200} />
            </figure>
            <div className={styles.text}>
                <h3>{db.name}</h3>
                <p>{db.title}</p>
            </div>
            {db.jobSeeking && <p className={styles.opentowork} data-content="Open to work"></p>}
        </div>
    )
}
