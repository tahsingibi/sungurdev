import React from 'react'
import Image from 'next/image'
import profile from '@/src/img/profile.jpeg'
import styles from './style.module.scss'

const content = {
    name: "tahsin sungur",
    title: "frontend developer",
    openToWork: true,
}

export default function ProfileCard() {
    return (
        <div className={styles.profile}>
            <figure className={styles.image}>
                <Image src={profile} alt={content.name} objectFit="contain" />
            </figure>
            <div className={styles.text}>
                <h3>{content.name}</h3>
                <p>{content.title}</p>
            </div>
            {content.openToWork && <p className={styles.opentowork} data-content="Open to work"></p>}
        </div>
    )
}
