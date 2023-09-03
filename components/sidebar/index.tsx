import React from 'react';
import styles from './style.module.scss';
import Logo from '@/components/logo';
import Navbar from '@/components/navbar';
import Socialbar from "@/components/socialbar"

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} id="sidebar">
      <Logo />
      <Navbar />
      <hr />
      <Socialbar />
    </aside>
  );
}
