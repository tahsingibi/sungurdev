import Image from 'next/image'
import { PageWrapper } from '@/components'
import { Links } from '@/components'
import styles from './homepage.module.scss'
import profilePic from '@/src/img/profile.jpeg'

export default function Homepage() {

    const Headline = PageWrapper.Headline;
    const Title = PageWrapper.Title;
    const Description = PageWrapper.Description;
    const Cover = PageWrapper.CoverImage;

    return (
        <PageWrapper>
            <Headline>
                <Title>Merhaba, ben Tahsin 👋</Title>
                <Description>
                    28 yaşındayım, İzmir&apos;de yaşıyorum. <Links href="https://mallconomy.com" target="_blank">Mallconomy</Links> şirketinde tam zamanlı Frontend Developer olarak çalışıyorum. Frontend teknolojileri haricinde video çekme, düzenleme ve grafik tasarım ile uğraşıyorum. Tüm bunların haricinde <Links href="https://tahsinbey.com" target="_blank">tahsinbey.com</Links>&apos;da kişisel blog yazıları paylaşıyorum.
                </Description>
            </Headline>

            <figure className={styles.about}>
                <Image src={profilePic} alt="Tahsin Sungur" fill />
            </figure>
        </PageWrapper >
    )
}
