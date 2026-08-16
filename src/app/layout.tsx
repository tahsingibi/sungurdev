import { InlineScript } from "@/components/custom/inline-script";
import Layout from "@/components/custom/layout";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { WebVitals } from "@/components/custom/web-vitals";
import { Toaster } from "@/components/ui/sonner";
import settings from "@/lib/settings";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const themeBootstrapScript = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=([^;]*)/);var t=m?decodeURIComponent(m[1]):null;var v=t==="light"||t==="dark"||t==="system"?t:"system";var r=v==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):v;var e=document.documentElement;e.classList.remove("light","dark");e.classList.add(r);e.style.colorScheme=r}catch(e){}})()`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: settings.seo.themeColor,
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(settings.url),
  title: {
    default: `${settings.name} — ${settings.title}`,
    template: `%s | ${settings.name}`,
  },
  description: settings.seo.description,
  applicationName: settings.name,
  authors: [{ name: settings.name, url: settings.url }],
  creator: settings.name,
  publisher: settings.name,
  keywords: settings.keywords,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${settings.name} RSS` }],
    },
  },
  openGraph: {
    type: "website",
    locale: settings.seo.ogLocale,
    url: settings.url,
    siteName: settings.name,
    title: `${settings.name} — ${settings.title}`,
    description: settings.seo.description,
    images: [{ url: settings.image, alt: settings.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: `@${settings.slug}`,
    title: `${settings.name} — ${settings.title}`,
    description: settings.seo.description,
    images: [settings.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: settings.seo.googleSiteVerification,
    other: settings.seo.ahrefsSiteVerification
      ? { "ahrefs-site-verification": settings.seo.ahrefsSiteVerification }
      : undefined,
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: settings.name,
        url: settings.url,
        description: settings.seo.description,
      },
      {
        "@type": "Person",
        name: settings.name,
        url: settings.url,
        image: new URL(settings.image, settings.url).toString(),
        sameAs: settings.social
          .filter(({ path }) => path.startsWith("http"))
          .map(({ path }) => path),
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeBootstrapScript} />
      </head>
      <body className="flex min-h-full flex-col bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <Layout>{children}</Layout>
          <WebVitals
            endpoint={settings.analytics.webVitalsEndpoint}
            googleAnalyticsId={settings.analytics.googleAnalyticsId}
          />
          <Toaster />
        </ThemeProvider>
      </body>
      {settings.analytics.googleAnalyticsId && (
        <GoogleAnalytics gaId={settings.analytics.googleAnalyticsId} />
      )}
    </html>
  );
}
