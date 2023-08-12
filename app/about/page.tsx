import type { Metadata } from 'next'
import AboutPage from '@/pages/About'

export const metadata: Metadata = {
    title: 'Hakkımda - Tahsin Sungur',
}


export default function About() {
    return <div className="container"><AboutPage /></div>
}
