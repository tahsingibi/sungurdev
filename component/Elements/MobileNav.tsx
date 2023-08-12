"use client";
import React, { useLayoutEffect, useState } from 'react'
import styles from './elements.module.scss'
import { menu, close } from '@/utils';

export function MobileNav() {
    const [open, setOpen] = useState(false)

    useLayoutEffect(() => {
        if (window && document) {
            const sidebar = document.querySelector('aside#sidebar')
            sidebar?.classList[open ? 'add' : 'remove']('show')
        }
    }, [open])

    return (
        <div className={styles.mobilenav}>
            <button onClick={() => setOpen(!open)}>{open ? close : menu}</button>
        </div >
    )
}