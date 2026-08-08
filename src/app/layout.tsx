import { fontVariables } from '../assets/fonts';
import Footer from '../components/footer';
import Header from '../components/header';
import { layoutMetadata } from '../metadata';
import settings from '../settings';
import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = layoutMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const baseUrl = settings.url.replace(/\/$/, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: settings.name,
        url: baseUrl,
        image: `${baseUrl}${settings.image}`,
        jobTitle: settings.title,
        sameAs: settings.social.filter(({ path }) => path.startsWith('http')).map(({ path }) => path),
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: settings.name,
        description: `${settings.name} — ${settings.title}`,
        author: { '@id': `${baseUrl}/#person` },
        inLanguage: 'en',
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={fontVariables}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <div className="mx-auto flex min-h-screen w-[calc(100%_-_1rem)] max-w-3xl flex-col border-x border-zinc-800/80 bg-zinc-950">
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
