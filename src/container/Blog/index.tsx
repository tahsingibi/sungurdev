import React from 'react'
import { Heading } from '@/src/component/Elements'
import BlogList from '@/src/component/Elements/BlogList'


export default function BlogPage({ params }: any) {

  return (
    <>
      <Heading>Blog</Heading>
      <p>Bu portföy üzerinde henüz bir post yayınlamadım fakat teknik içerikleri buraya taşımayı düşündüğümden dolayı sayfayı da hazırlamak istedim. Yeni yazı yayınlayana kadar tahsinbey.com üzerindeki blogları okuyabilirsiniz.</p>
      <BlogList />
    </>
  )
}
