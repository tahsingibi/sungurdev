import { DotList } from "@/components/custom/panel";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export type TickerGroup = {
  label: string;
  items: readonly string[];
};

/** Mono yazı tipinde bir karakterin yaklaşık genişliği (px). */
const CHAR_WIDTH = 8;
/**
 * Şerit hızı (px/sn) — okunacak kadar yavaş, sıkmayacak kadar canlı.
 *
 * Hero'daki tam stack ~3700px: daha yavaşında bir tur bir dakikayı geçiyor ve
 * listenin sonunu kimse görmüyor, daha hızlısında metin okunmaz oluyor.
 */
const SPEED = 62;
/** Kopya sayısı hesaplanırken varsayılan en geniş kapsayıcı. */
const MIN_TRACK_WIDTH = 900;

/** Bir kopyanın yaklaşık genişliği: süre ve kopya sayısı buradan çıkıyor. */
function measure(groups: readonly TickerGroup[]): number {
  const chars = groups.reduce(
    // +10: `[ ]` ayraçları, harf aralığı ve gruplar arası boşluk payı.
    (total, group) =>
      total + group.label.length + group.items.join(" · ").length + 10,
    0,
  );

  return chars * CHAR_WIDTH;
}

/** Tek kopya: etiket + öğeler, hepsi tek satırda. */
function Segment({
  groups,
  clone = false,
}: {
  groups: readonly TickerGroup[];
  clone?: boolean;
}) {
  return (
    <div
      aria-hidden={clone || undefined}
      data-ticker-clone={clone ? "" : undefined}
      className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap"
    >
      {groups.map((group) => (
        <span key={group.label} className="flex items-center gap-3">
          <span className="nfo-tag text-2xs uppercase tracking-[0.2em] text-primary">
            {group.label}
          </span>
          <span className="text-muted-foreground">
            <DotList items={group.items} />
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Ticker — sonsuz kayan şerit.
 *
 * Uzun ama "referans" nitelikteki listeler (stack, etiketler) alt alta sarınca
 * sayfada hak ettiğinden çok yer kaplıyor. Şerit hâlinde yatay akınca aynı
 * bilgi tek satıra iniyor ve NFO diline de oturuyor: release ticker'ı.
 *
 * Aynı içerik yan yana birkaç kez basılıyor, şerit tam bir kopya boyunca
 * kaydırılıyor: döngü başa döndüğünde kayma noktası kopya sınırına denk
 * geldiği için dikiş görünmüyor. Klonlar `aria-hidden`, yani ekran okuyucu
 * listeyi yalnızca bir kez okuyor. JS yok — sunucu bileşeni olarak çalışıyor.
 *
 * Süre içeriğin genişliğinden hesaplanıyor: kısa şerit de uzun şerit de aynı
 * hızda akıyor, sabit süre verilseydi kısa olanlar fırlardı.
 */
export function Ticker({
  groups,
  reverse = false,
  className,
}: {
  groups: readonly TickerGroup[];
  /** Alt alta iki şerit varsa biri ters aksın — tek blok gibi durmasınlar. */
  reverse?: boolean;
  className?: string;
}) {
  const width = measure(groups);
  const duration = Math.max(12, Math.round(width / SPEED));
  // Kısa içerik tek kopyayla kapsayıcıyı dolduramaz, arada boşluk görünür.
  const copies = Math.max(2, Math.ceil(MIN_TRACK_WIDTH / width) + 1);

  return (
    // Maske ayrı katmanda: dışa çizgi/çerçeve verildiğinde erime efekti o
    // çizgiyi de yiyip uçlarını soluklaştırmasın.
    <div className={cn("min-w-0", className)}>
      <div className="ticker-mask w-full min-w-0 overflow-hidden">
        <div
          // `shrink-0`: kapsayıcı flex olduğunda şerit içerik genişliğini korur.
          className="ticker-track flex w-max shrink-0 animate-ticker"
          style={
            {
              "--tw-duration": `${duration}s`,
              "--ticker-shift": `-${(100 / copies).toFixed(4)}%`,
              animationDirection: reverse ? "reverse" : undefined,
            } as CSSProperties
          }
        >
          {Array.from({ length: copies }, (_, index) => (
            <Segment key={index} groups={groups} clone={index > 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
