"use client";
import React, { useEffect, useRef, useState } from 'react'
import styles from "./style.module.scss"
import { menu, close } from '@/utils';

export default function MobileNav() {

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const sidebar = document.querySelector('aside#sidebar') as HTMLElement || null

    if (sidebar) sidebar.dataset.show = isOpen.toString();

  }, [isOpen])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 27) setIsOpen(false)
    })

    document.addEventListener('mousedown', (e) => {
      const sidebar = document.querySelector('aside#sidebar') as HTMLElement || null

      if (sidebar && e.target !== buttonRef.current && !buttonRef.current?.contains(e.target as Node) && !sidebar.contains(e.target as Node)) {
        setIsOpen(false);
      }
    });

    return () => {
      document.removeEventListener('keydown', () => { })
      document.removeEventListener('mousedown', () => { })
    }

  }, [])

  return (
    <div className={styles.mobilenav}>
      <button onClick={() => setIsOpen(!isOpen)} ref={buttonRef}>{isOpen ? close : menu}</button>
      <span>Anasayfa</span>
    </div >
  )
}
