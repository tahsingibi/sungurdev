import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import profilePic from '@/src/img/profile.jpeg';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <figure className={styles.avatar}>
        <Image src={profilePic} alt="Tahsin Sungur" width={120} height={120} />
      </figure>
      <div className={styles.text}>
        <span className={styles.name}>Tahsin Sungur</span>
        <span className={styles.title}>Frontend Developer</span>
      </div>
    </Link>
  );
}
