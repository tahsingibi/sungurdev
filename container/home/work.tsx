import React from 'react'
import styles from './style.module.scss'
import WorkCard from '@/components/custom/workcard'

const content = {
    title: "works",
    company: [
        {
            id: 0,
            image: "https://cdn.mallconomy.com/images/landing-v3/tv/mallconomy.svg",
            name: "Mallconomy",
            desc: "Frontend Developer",
            right: "2022 Sep - 2023 Nov",
            path: "/works#mallconomy"
        },
        {
            id: 1,
            image: "",
            name: "Freelance",
            desc: "Frontend Developer",
            right: "2010 - 2022",
            path: "/works#freelance"
        },
    ]
}

export default function Works() {

    return (
        <div className={styles.work}>
            <h4>{content.title}</h4>
            <div className={styles.list}>
                {content.company.map(co => <WorkCard {...co} key={co.id} />)}
            </div>
        </div>
    )
}
