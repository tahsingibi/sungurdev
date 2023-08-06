import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heading } from '@/src/component/Elements'
import picProfile from '@/src/asset/img/profile.jpg'
import styles from './home.module.scss'

export default function Home() {
    return (
        <>
            <Heading>Merhaba, ben Tahsin 👋</Heading>
            <p>
                28 yaşındayım, İzmir&apos;de yaşıyorum. <Link href="https://mallconomy.com" target="_blank">Mallconomy</Link> şirketinde tam zamanlı Frontend Developer olarak çalışıyorum. Frontend teknolojileri haricinde video çekme, düzenleme ve grafik tasarım ile uğraşıyorum. Tüm bunların haricinde <Link href="https://tahsinbey.com" target="_blank">tahsinbey.com</Link>&apos;da kişisel blog yazıları paylaşıyorum.
            </p>
            <figure className={styles.profile}>
                <Image src={picProfile} alt="Tahsin Sungur" fill />
            </figure>
        </>
    )
}
