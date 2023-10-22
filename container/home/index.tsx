import Image from "next/image"
import profile from '@/src/img/profile.jpeg'

const _content = {
  heading: "yo!",
  desc: `Ben Tahsin, İzmir&apos;de yaşayan bir frontend geliştiriciyim. Ekim 2022&apos;den itibaren Mallconomy&apos;de tam zamanlı frontend geliştirici olarak çalışıyorum. Frontend teknolojileri haricinde video edit, grafik tasarım ve mobil fotoğrafçılık ile ilgileniyorum. Tüm bunların haricinde <a href="https://tahsinbey.com">tahsinbey.com</a>&apos;da kişisel blog yazılarımı paylaşıyorum.`
}

export default function Home() {
  return (
    <>
      <h1>{_content.heading}</h1>
      <p dangerouslySetInnerHTML={{ __html: _content.desc }} />
      <Image src={profile} alt="Tahsin Sungur" objectFit="contain" />
    </>
  )
}
