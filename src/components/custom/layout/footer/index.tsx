import { SocialIcon } from "@/components/custom/social-icon";
import { ThemeToggle } from "@/components/custom/theme-provider/theme-toggle";
import { Button } from "@/components/ui/button";
import settings from "@/lib/settings";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";
import pkg from "../../../../../package.json";
import { BackToTop } from "./back-to-top";

/** Derleme anında dondurulan tarih — "bu sayfa ne zaman üretildi". */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const version = (value?: string) => value?.replace(/^[\^~]/, "");

function Cell({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-background px-5 py-4", className)}>
      <dt className="text-2xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 text-xs leading-relaxed">{children}</dd>
    </div>
  );
}

function FootLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-current"
    >
      {children}
    </Link>
  );
}

/**
 * Altbilgi — spec sheet.
 *
 * Kural: her hücrenin arkasında gerçek bir veri var. Sabit metinler
 * ("cloudflare workers", "geist mono") ve verisi olmayan alanlar ("analytics:
 * none") kaldırıldı — gösterilecek bir şey yoksa hücre de yok. Bir künye
 * ancak doğruysa bir şey anlatır; doldurulmuş bir künye sadece yer kaplar.
 *
 * Sürümler `package.json`dan okunuyor, tarih derleme anında donuyor,
 * bağlantılar `settings`ten geliyor.
 */
export default function Footer() {
  const { name, slug, social, blog, analytics, url, tagline } = settings;
  const year = new Date().getFullYear();

  const deps = pkg.dependencies as Record<string, string>;
  const devDeps = pkg.devDependencies as Record<string, string>;

  const stack = [
    ["next", version(deps.next)],
    ["react", version(deps.react)],
    ["tailwindcss", version(devDeps?.tailwindcss)],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <footer className="mt-auto border-t border-border">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4">
        <span className="text-xs">{url.replace(/^https?:\/\/|\/$/g, "")}</span>
        <span className="text-2xs text-muted-foreground">{tagline}</span>
      </div>

      {/*
        Hücre çizgileri ızgara boşluğundan geliyor: `gap-px` + zemin rengi
        ayırıcıyı çiziyor, hücreler kendi kenarlığını taşımıyor. Böylece
        kırılımlar her genişlikte hizalı kalıyor.
      */}
      <dl className="grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Cell label="crafted by">
          <FootLink href={social[0]?.path ?? blog.repository}>@{slug}</FootLink>
        </Cell>
        <Cell label="build">
          <span className="tnum">{BUILD_DATE}</span>
        </Cell>
        <Cell label="source">
          <FootLink href={blog.repository}>github</FootLink>
        </Cell>
        <Cell label="feed">
          <Link
            href="/rss.xml"
            className="underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-current"
          >
            rss
          </Link>
        </Cell>

        {analytics.googleAnalyticsId ? (
          // Tam satır: dört sütunluk ızgarada beşinci hücre yalnız kalınca
          // yanındaki boşluk ayırıcı zemini olarak görünüyordu.
          <Cell label="analytics" className="sm:col-span-2 lg:col-span-4">
            google analytics
          </Cell>
        ) : null}

        <Cell label="stack" className="sm:col-span-2 lg:col-span-4">
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            {stack.map(([pkgName, pkgVersion]) => (
              <span key={pkgName}>
                {pkgName}
                <span className="text-muted-foreground">@{pkgVersion}</span>
              </span>
            ))}
          </span>
        </Cell>
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 max-sm:justify-center max-sm:text-center">
        <span className="text-2xs text-muted-foreground">
          © {year} {name}
        </span>

        <div className="flex items-center gap-0.5">
          {social.map((link) => {
            return (
              /*
                Tema ve başa-dön düğmeleriyle aynı tip ve aynı ikon boyutu.
                Eskiden bunlar çıplak bağlantıydı ve her markanın kendi
                viewBox'ı yüzünden X, GitHub ve LinkedIn farklı boyutta
                görünüyordu.
              */
              <Button
                key={link.id}
                asChild
                size="icon-sm"
                variant="ghost"
                aria-label={link.name}
              >
                <Link
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name={link.icon} className="size-4" />
                </Link>
              </Button>
            );
          })}
          <span aria-hidden className="mx-1.5 h-3 w-px bg-border" />
          <ThemeToggle />
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
