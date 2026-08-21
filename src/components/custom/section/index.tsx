import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Bölüm — v1'in blok başlığı.
 *
 * Başlık küçük harf ve sade; yanında bölümü açan bir bağlantı, satırın
 * sonunda isteğe bağlı bir sayaç. Bölümü kutu içine almak yerine sadece
 * adlandırıyor: dar kolonda üst üste dizilen çerçeveler sayfayı forma
 * çeviriyordu, oysa buradaki her bölüm zaten kendi listesiyle ayrılıyor.
 *
 * Bağlantının etiketi isteğe bağlı: verilmezse yerine bir ok düğmesi geçiyor.
 * "see all", "view detail", "archive" üç ayrı bölümde üç ayrı kelimeydi ve
 * hepsi aynı şeyi yapıyordu — okun kendisi bunu tek bir işaretle söylüyor,
 * üstelik başlığın yanında yer kaplamadan. Etiket yine de gönderilebiliyor
 * (metin ya da ikon), çünkü bir gün gerçekten farklı bir şey söylemesi
 * gerekebilir.
 */
export function Section({
  id,
  title,
  link,
  meta,
  children,
  className,
}: {
  id?: string;
  title: string;
  /**
   * Bölümün tamamına giden bağlantı.
   *
   * `label` verilmezse ok düğmesi çizilir; `external` dış bağlantıyı yeni
   * sekmede açar ve okun yönünü dışarı çevirir.
   */
  link?: { href: string; label?: ReactNode; external?: boolean };
  /** Satırın sonundaki sayaç: `03`, `12 posts`. */
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex items-baseline gap-2.5">
        <h2 className="text-base font-medium text-foreground">{title}</h2>
        {link ? <SectionLink title={title} {...link} /> : null}
        {meta ? (
          <span className="tnum ml-auto font-mono text-2xs text-muted-foreground">
            {meta}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function SectionLink({
  href,
  label,
  external,
  title,
}: {
  href: string;
  label?: ReactNode;
  external?: boolean;
  title: string;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      /* Etiketsiz hâlde erişilebilir bir isim gerekiyor: ok tek başına
         ekran okuyucuya hiçbir şey söylemiyor. */
      aria-label={label ? undefined : `View all ${title}`}
      className={cn(
        "group text-muted-foreground transition-colors hover:text-foreground",
        label
          ? "font-mono text-xs"
          : /* `self-center`: satır `items-baseline`, kare bir düğme orada
               taban çizgisine oturamaz. */
            "grid size-7 shrink-0 place-items-center self-center rounded-lg hover:bg-accent",
      )}
    >
      {label ?? (
        <Icon
          aria-hidden
          className={cn(
            "size-4 transition-transform",
            external
              ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              : "group-hover:translate-x-0.5",
          )}
        />
      )}
    </Link>
  );
}

/**
 * Satır listesi.
 *
 * `-mx-3` + satır dolgusu: hover zemini metnin biraz dışına taşıyor, böylece
 * tıklama alanı kolonun kenarına kadar uzuyor ama yazı hizası bozulmuyor.
 */
export function Rows({ children }: { children: ReactNode }) {
  return <div className="-mx-3 flex flex-col">{children}</div>;
}

/**
 * Liste satırı.
 *
 * `href` verilince satırın tamamı bağlantı. Verilmezse (proje satırları gibi
 * içinde kendi bağlantıları olanlar) kutu olarak duruyor — iç içe bağlantı
 * hem geçersiz hem klavyeyle gezilemez oluyor.
 */
export function Row({
  href,
  external,
  media,
  title,
  subtitle,
  meta,
  after,
}: {
  href?: string;
  external?: boolean;
  /** Sol taraftaki kutu: baş harf, ikon veya görsel. */
  media?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Sağda, alt satırda: tarih veya dönem. */
  meta?: ReactNode;
  /** Satırın sonundaki kendi bağlantıları (github / live). */
  after?: ReactNode;
}) {
  const body = (
    <>
      {media}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{title}</span>
        {subtitle || meta ? (
          <span className="flex flex-wrap items-baseline justify-between gap-x-3 text-xs text-muted-foreground">
            {subtitle ? <span className="min-w-0">{subtitle}</span> : null}
            {meta ? (
              <span className="tnum shrink-0 font-mono text-2xs">{meta}</span>
            ) : null}
          </span>
        ) : null}
      </span>
      {/*
        Satırın kendi bağlantıları (github / live) dar ekranda alt satıra
        iniyor: 390px'de gövdeyle yan yana kaldıklarında açıklama üç satıra
        sarıyor ve iki sütun da okunmaz hâle geliyordu. Girinti, üstteki
        başlığın hizasını tutuyor (kutu 2rem + boşluk 0.875rem).
      */}
      {after ? (
        <span className="shrink-0 max-sm:w-full max-sm:pl-[2.875rem]">
          {after}
        </span>
      ) : null}
    </>
  );

  const className =
    "group flex flex-wrap items-center gap-x-3.5 gap-y-2 rounded-lg px-3 py-3 transition-colors hover:bg-accent/70 active:translate-y-px";

  if (!href) return <div className={className}>{body}</div>;

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {body}
    </Link>
  );
}

/** Satırın solundaki kare — logo dosyası olmayan kayıtlar için baş harfler. */
export function RowMedia({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted font-mono text-2xs text-muted-foreground">
      {children}
    </span>
  );
}
