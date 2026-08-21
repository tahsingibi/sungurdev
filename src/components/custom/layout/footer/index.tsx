import { ThemeToggle } from "@/components/custom/theme-provider/theme-toggle";
import settings from "@/lib/settings";
import Link from "next/link";
import type { ReactNode } from "react";
import pkg from "../../../../../package.json";
import { BackToTop } from "./back-to-top";

/** Derleme anında dondurulan tarih — "bu sayfa ne zaman üretildi". */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const version = (value?: string) => value?.replace(/^[\^~]/, "");

function FootLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}

/**
 * Altbilgi.
 *
 * Dört hücreli künye ızgarasının yerini iki satır aldı: 490px'lik kolonda o
 * ızgara her genişlikte alt alta yığılıp sayfanın en ağır bloğu oluyordu —
 * bir künye, gövdeden daha fazla yer kaplamamalı. Buna karşılık v1'in tek
 * satırlık altbilgisi de kaynak ve besleme bağlantısını hiç göstermiyordu.
 *
 * Kalan iki satır: üstte kimlik ve araçlar, altta telif ve teknik künye.
 * Sosyal bağlantılar burada tekrar edilmiyor; künyede, hemen yukarıda,
 * ikonlarıyla duruyorlar.
 *
 * Künyedeki her değer gerçek: sürümler `package.json`dan okunuyor, tarih
 * derleme anında donuyor. Sabit metin yazılmıyor — doğrulanamayan bir künye
 * yalnızca yer kaplar.
 */
export default function Footer() {
  const { name, url, tagline, blog } = settings;
  const year = new Date().getFullYear();
  const nextVersion = version((pkg.dependencies as Record<string, string>).next);

  return (
    <footer className="mt-auto flex flex-col gap-3.5 border-t border-border pt-6 pb-10">
      <div className="flex items-center gap-4">
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-medium text-foreground">
            {url.replace(/^https?:\/\/|\/$/g, "")}
          </span>
          <span className="text-xs text-muted-foreground">{tagline}</span>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-0.5">
          <ThemeToggle />
          <BackToTop />
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 font-mono text-2xs text-muted-foreground">
        <span>
          © {year} {name}
        </span>

        <span className="flex flex-wrap items-baseline gap-x-2.5">
          <FootLink href={blog.repository} external>
            source
          </FootLink>
          <span aria-hidden className="text-border">
            ·
          </span>
          <FootLink href="/rss.xml">rss</FootLink>
          {nextVersion ? (
            <>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>next {nextVersion}</span>
            </>
          ) : null}
          <span aria-hidden className="text-border">
            ·
          </span>
          <span className="tnum">build {BUILD_DATE}</span>
        </span>
      </div>
    </footer>
  );
}
