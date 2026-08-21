import type { ReactNode } from "react";

/**
 * Liste sayfalarının künyesi — /write, /works.
 *
 * Ana sayfadaki bölüm başlığının büyük kardeşi: aynı sırada aynı öğeler
 * (ad, sayaç, eylem), yalnızca puntosu bir kademe yukarıda. Sayfa başlığı
 * için ayrı bir dil kurmak, iki tarafta iki farklı hiyerarşi demekti.
 *
 * Zemin, listelerdeki satırların hover renginin aynısı — ama burada sabit.
 * Yeni bir yüzey icat etmeden künyeyi sayfadan ayırıyor: aynı sayfada zaten
 * var olan tek bir vurgu tonu, bir yerde geçici bir durum (hover), bir yerde
 * kalıcı bir başlık.
 */
export function PageHeader({
  heading,
  description,
  meta,
  action,
}: {
  heading: string;
  description: string;
  /** Sayaç — "05 posts" gibi. */
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <header className="-mx-3 flex flex-col gap-2 rounded-xl bg-accent/70 px-3 py-3.5">
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-medium lowercase text-foreground">
          {heading}
        </h1>
        {meta ? (
          <span className="tnum font-mono text-2xs text-muted-foreground">
            {meta}
          </span>
        ) : null}
        {action ? <span className="ml-auto shrink-0">{action}</span> : null}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  );
}

/**
 * Yazı künyesi.
 *
 * Kayıt numarası kalktı: arşiv artık kartlarla değil satırlarla listeleniyor
 * ve orada bir numara yok — burada göstermek, hiçbir yerde karşılığı olmayan
 * bir kimliğe işaret etmek olurdu. Kalanlar okumadan önce gerçekten sorulan
 * iki şey: ne zaman yazıldı, ne kadar sürer.
 */
export function ArticleHeader({
  category,
  date,
  readingMinutes,
  title,
  description,
}: {
  category?: string;
  /** ISO tarih — `<time>` etiketine de aynısı gidiyor. */
  date: string;
  readingMinutes: number;
  title: string;
  description?: string;
}) {
  return (
    <header className="flex flex-col gap-3">
      {/*
        `font-mono`: gövde `article` içinde sans (uzun okuma için), künye
        satırları ise sitenin geri kalanındaki veri satırlarıyla aynı.
      */}
      <div className="flex flex-wrap items-baseline gap-x-2.5 font-mono text-2xs text-muted-foreground">
        {category ? (
          <>
            <span className="lowercase">{category}</span>
            <span aria-hidden className="text-border">
              ·
            </span>
          </>
        ) : null}
        <time dateTime={date} className="tnum">
          {date}
        </time>
        <span aria-hidden className="text-border">
          ·
        </span>
        <span className="tnum">{readingMinutes} min read</span>
      </div>

      <h1 className="text-2xl leading-snug font-medium tracking-tight text-balance text-foreground">
        {title}
      </h1>

      {description ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
