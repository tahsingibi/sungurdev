import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  heading: string;
  description: string;
  href?: string;
  action?: ReactNode;
  eyebrow?: ReactNode;
  level?: "h1" | "h2";
  size?: "default" | "lg";
  bordered?: boolean;
  /** Sağ uçta duran sayaç — "7 releases" gibi. */
  meta?: string;
  /**
   * `tag`   — `[ BÖLÜM ]`, bölüm işareti (varsayılan).
   * `title` — okunabilir başlık; yazı sayfaları için.
   *
   * İkisi ayrı çünkü etiket biçimi (büyük harf + geniş harf aralığı) kısa
   * bölüm adlarında iyi çalışıyor ama uzun bir yazı başlığında okumayı
   * bozuyor.
   */
  variant?: "tag" | "title";
}

/**
 * Bölüm başlığı — `[ WORK ]`.
 *
 * NFO dosyalarındaki bölüm işaretinin aynısı. Büyük puntolu başlıklar yerine
 * bu tercih edildi çünkü sayfada altı bölüm var ve hepsi iri başlıkla
 * açılınca hiçbiri öne çıkmıyor; asıl iri öğe banner olmalı, bölümler ona
 * göre sessiz durmalı.
 */
export function SectionHeader({
  heading,
  description,
  href,
  action,
  eyebrow,
  level = "h2",
  size = "default",
  bordered = false,
  meta,
  variant = "tag",
}: SectionHeaderProps) {
  const Heading = level;
  const isTitle = variant === "title";

  const tag = isTitle ? (
    <span className="min-w-0 text-lg leading-snug tracking-tight text-foreground sm:text-xl">
      {heading}
    </span>
  ) : (
    <span
      className={cn(
        "nfo-tag shrink-0 uppercase tracking-[0.3em] text-primary",
        size === "lg" ? "text-sm" : "text-xs",
      )}
    >
      {heading}
    </span>
  );

  return (
    <header
      className={cn(
        /*
          `lg` yalnızca yazı sayfasının başlığında kullanılıyor ve oradaki
          gövde metniyle aynı hizada durmalı: gövde `px-6 sm:px-8` + metin
          blokları `sm:px-8` alıyor, yani geniş ekranda toplam 4rem.
        */
        size === "lg" ? "px-6 pt-10 pb-6 sm:px-16" : "px-6 pt-8 pb-4",
        bordered && "border-b border-border",
      )}
    >
      {eyebrow}

      <Heading className="flex items-center gap-3">
        {href ? (
          <Link
            href={href}
            className="group flex min-w-0 flex-1 items-center gap-3"
          >
            {tag}
            <span aria-hidden className="h-px flex-1 bg-border" />
            <span className="shrink-0 text-2xs text-muted-foreground transition-colors group-hover:text-primary">
              {meta ? `${meta} →` : "→"}
            </span>
          </Link>
        ) : (
          <>
            {tag}
            {isTitle ? null : (
              <span aria-hidden className="h-px flex-1 bg-border" />
            )}
            {meta && !isTitle ? (
              <span className="shrink-0 text-2xs text-muted-foreground">
                {meta}
              </span>
            ) : null}
          </>
        )}
      </Heading>

      <div className="mt-2 flex items-end justify-between gap-4 max-sm:flex-col max-sm:items-start">
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
        {action}
      </div>
    </header>
  );
}
