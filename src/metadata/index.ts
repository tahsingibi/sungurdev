import settings from '@/src/settings';
import type { Metadata, MetadataRoute } from 'next';

export const defaultPath = settings.url;
export const appName = `${settings.name} - ${settings.title}`;
export const description = `${settings.name} is a frontend developer in Izmir building accessible, performant web products with React and Next.js.`;
export const keywords = settings.keywords;
export const ogImages = [{ url: '/opengraph-image', width: 1200, height: 630, alt: appName }];
export const authors = [{ name: settings.name, url: defaultPath }];
export const googleVerify = '';
export const yandexVerify = '';
export const yahooVerify = '';
export const rssAlternates = { 'application/rss+xml': '/rss.xml' };

export const layoutMetadata: Metadata = {
  metadataBase: new URL(defaultPath),
  title: {
    template: `%s | ${appName}`,
    default: appName,
  },
  description: description,
  keywords: keywords,
  alternates: {
    canonical: '/',
    types: rssAlternates,
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'Next.js',
  applicationName: appName,
  referrer: 'origin-when-cross-origin',
  authors: authors,
  openGraph: {
    title: {
      template: `%s | ${appName}`,
      default: appName,
    },
    description: description,
    url: defaultPath,
    siteName: appName,
    images: ogImages,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tahsingibi',
    images: ['/opengraph-image'],
  },
  verification: {
    google: googleVerify,
    yandex: yandexVerify,
    yahoo: yahooVerify,
  },
};

export const pageMetadata: Record<'home' | 'write' | 'works', Metadata> = {
  home: {},
  write: {
    title: 'Write',
    description: 'Technical notes, snippets and practical development guides by Tahsin Sungur.',
    alternates: { canonical: '/write', types: rssAlternates },
    openGraph: {
      title: 'Write',
      description: 'Technical notes, snippets and practical development guides by Tahsin Sungur.',
      url: '/write',
    },
  },
  works: {
    title: 'Experiences',
    description: 'Professional experience and selected frontend projects by Tahsin Sungur.',
    alternates: { canonical: '/works', types: rssAlternates },
    openGraph: {
      title: 'Experiences',
      description: 'Professional experience and selected frontend projects by Tahsin Sungur.',
      url: '/works',
    },
  },
};

export const sitemap: MetadataRoute.Sitemap = [
  {
    url: defaultPath,
    lastModified: '2026-08-08T00:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: defaultPath + 'works',
    lastModified: '2026-08-08T00:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: defaultPath + 'write',
    lastModified: '2026-08-08T00:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
];

export const robots: MetadataRoute.Robots = {
  rules: [
    { userAgent: '*', allow: '/', disallow: '/private/' },
    { userAgent: ['OAI-SearchBot', 'GPTBot', 'ClaudeBot', 'anthropic-ai'], allow: '/' },
  ],
  sitemap: defaultPath + 'sitemap.xml',
  host: defaultPath,
};
