import type { Metadata } from 'next'
import '@/styles/globals.scss'
import MainLayout from '@/layout/main'

export const metadata: Metadata = {
  title: 'Tahsin Sungur',
  description: 'Frontend developer, graphic designer and blogger.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {/* – Frontend Developer */}
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
