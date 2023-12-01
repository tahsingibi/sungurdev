import React from 'react'
import styles from './style.module.scss'
import WorkCard from '@/components/custom/workcard'
import db from '@/db.json'

const content = { title: "works" }

export default function Works() {

    return (
        <div className={styles.work}>
            <h4>{content.title}</h4>
            <div className={styles.list}>
                {db.works.map(co => <WorkCard {...co} key={co.id} />)}
            </div>
        </div>
    )
}
