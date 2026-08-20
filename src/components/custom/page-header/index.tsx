import type { ReactNode } from "react";

/**
 * Liste sayfalarının künyesi — /write, /works.
 *
 * Dikey raylı bir düzen: solda dar bir sütunda rota ve sayaç, ortada ince
 * bir hat, sağda başlık ve açıklama. Bilgi sayfanın *kenarında* duruyor,
 * başlığın önünde değil.
 *
 * Neden böyle: bu sayfalarda başlık tek başına taşıyabileceğinden fazlasını
 * taşımak zorunda kalıyordu — hangi ekrandayız, kaç kayıt var, besleme
 * nerede, hepsi başlığın etrafına dizilince başlangıç bir künyeden çok bir
 * araç çubuğuna benziyordu. Ray bunları kendi sütununa alıyor: göz önce
 * başlığı okuyor, sayaçlar isteyene kenarda duruyor.
 *
 * Dikey hat sitede zaten var (works sayfasındaki deneyim blokları) — burada
 * aynı çizgi künyeyi başlıktan ayırıyor, yeni bir öğe icat edilmiyor.
 */
export function PageHeader({
  path,
  heading,
  description,
  meta,
  action,
}: {
  /** Rota — `/write` verilince rayda `~/write` olarak duruyor. */
  path: string;
  heading: string;
  description: string;
  /** Sayaç — "05 posts" gibi. */
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <header className="border-b border-border px-6 py-8">
      <h1 className="text-2xl leading-none lowercase">{heading}</h1>

      <div className="mt-3 flex items-end justify-between gap-4 max-sm:flex-col max-sm:items-start">
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
        {action}
      </div>
    </header>
  );
}

export function ArticleHeader({
  record,
  category,
  date,
  readingMinutes,
  title,
  description,
}: {
  /** Kayıt numarası — arşivdeki kartın etiketiyle birebir aynı. */
  record?: string;
  category?: string;
  /** ISO tarih — `<time>` etiketine de aynısı gidiyor. */
  date: string;
  readingMinutes: number;
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-border px-6 pt-8 pb-8 sm:px-16">
      {/*
        `font-mono`: gövde `article` içinde sans'a dönüyor (uzun okuma için),
        ama künye satırları sitenin geri kalanında mono — kart ile aynı
        görünmeleri gerekiyor, o yüzden burada geri alınıyor.
      */}
      <div className="flex items-baseline justify-between gap-4 font-mono text-2xs text-muted-foreground">
        {record ? (
          <span className="uppercase tracking-[0.3em] text-primary">
            {record}
          </span>
        ) : (
          <span />
        )}
        <span className="tnum shrink-0">
          <time dateTime={date}>{date}</time>
          <span aria-hidden className="mx-2 text-border">
            ·
          </span>
          {readingMinutes} min read
        </span>
      </div>

      {category ? (
        <p className="mt-6 font-mono text-2xs lowercase text-muted-foreground">
          {category}
        </p>
      ) : null}

      <h1 className="mt-1.5 text-2xl leading-snug tracking-tight text-balance">
        {title}
      </h1>

      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
