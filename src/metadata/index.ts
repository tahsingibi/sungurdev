import settings from '@/src/settings';
import type { Metadata, MetadataRoute } from 'next';

export const defaultPath = settings.url;
export const appName = `${settings.name} - ${settings.title}`;
export const description = `${settings.name} - ${settings.title}`;
export const keywords = settings.keywords;
export const ogImages = [{ url: '#', width: 800, height: 600 }];
export const authors = [{ name: settings.name }];
export const googleVerify = '';
export const yandexVerify = '';
export const yahooVerify = '';

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
  },
  works: {
    title: 'Experiences',
  },
};

export const sitemap: MetadataRoute.Sitemap = [
  {
    url: defaultPath,
    lastModified: '2024-04-08T10:30:45.844Z',
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: defaultPath + 'works',
    lastModified: '2024-04-08T10:30:45.844Z',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: defaultPath + 'write',
    lastModified: '2024-04-08T10:30:45.844Z',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
];

export const robots: MetadataRoute.Robots = {
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: '/private/',
  },
  sitemap: defaultPath + 'sitemap.xml',
};
