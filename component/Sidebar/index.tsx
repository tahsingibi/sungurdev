import React from 'react'
import styles from './sidebar.module.scss'

import ProfileCard from '../ProfileCard'
import Navbar from '../Navbar'
import Social from '../Socialbar'

export default function Sidebar() {
    return (
        <aside className={styles.sidebar} id="sidebar">
            <ProfileCard />
            <Navbar />
            <hr />
            <Social />
        </aside>
    )
}
