import Image from 'next/image'
import Link from 'next/link'
import styles from './logo.module.scss'
import profile from '@/src/img/profile.jpeg'

export function Logo() {
    return (
        <Link href="/">
            <div className={styles.logo}>
                <figure className={styles.img}>
                    <Image src={profile} quality={25} alt='Tahsin Sungur' fill />
                </figure>
                <div className={styles.text}>
                    <p className={styles.name}>Tahsin Sungur</p>
                    <p className={styles.title}>Frontend Developer</p>
                </div>
            </div>
        </Link>
    )
}
