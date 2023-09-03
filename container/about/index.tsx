import Link from 'next/link'
import React from 'react'

export default function About() {
  return (
    <>
      <h2>Hakkımda</h2>
      <article>
        <p>Ben Tahsin Sungur. İzmir&apos;de yaşayan 29 yaşında bir frontend geliştiriciyim, Ekim 2022&apos;den bu yana Mallconomy bünyesinde web3 tabanlı geliştirmeler yapıyorum. Bunların dışında uzun zamandır grafik tasarım, video düzenleme/kurgulama ve amatör mobil fotoğrafçılık ile ilgileniyorum. Aynı zamanda tüm bu alanlarla ilgili olarak <Link href="https://tahsinbey.com" target='_blank'>tahsinbey.com</Link>&apos;da kişisel yazılar yayınlıyorum.</p>
      </article>
    </>
  )
}
