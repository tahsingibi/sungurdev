import type { Experience } from "@/types/settings";
import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * Deneyim zaman çizelgesi — bölümün tek içeriği.
 *
 * Activity panelindeki fikrin aynısı: parlayan tek sayı + gerçek veriden,
 * düz elemanlardan kurulu bir grafik. Yanında ayrı bir rol listesi
 * durmuyor, çünkü aynı üç kaydı iki kere yazmak demekti; listenin taşıdığı
 * her şey — kayıt numarası, ünvan, dönem, çıkan iş — çubuğun künye satırına
 * girdi. Satırın tamamı ilgili deneyime gidiyor.
 *
 * Çubuklar, satırların söylemediği tek şeyi söylüyor: rollerin birbirine
 * göre ağırlığı ve nerede durdukları.
 */

const ACTIVE_PATTERN = /present|now|current/i;

/** `03/2024`, `2016`, `Present` → ondalıklı yıl (2024.17, 2016, 2026.6). */
function toFractionalYear(token: string, fallback: number): number {
  const value = token.trim();

  if (ACTIVE_PATTERN.test(value)) {
    const today = new Date();
    return today.getFullYear() + today.getMonth() / 12;
  }

  const monthly = value.match(/^(\d{1,2})\/(\d{4})$/);
  if (monthly) return Number(monthly[2]) + (Number(monthly[1]) - 1) / 12;

  const yearly = value.match(/\d{4}/);
  return yearly ? Number(yearly[0]) : fallback;
}

export function ExperienceTimeline({
  items,
  total,
}: {
  items: Experience[];
  /** Kayıt numaraları için toplam — `EXP_03`, `EXP_02` … */
  total?: number;
}) {
  const count = total ?? items.length;
  const thisYear = new Date().getFullYear();

  const rows = items.map((item, index) => {
    const [rawStart, rawEnd] = item.year.split(/\s*[-–—]\s*/);
    const start = toFractionalYear(rawStart ?? "", thisYear);

    return {
      id: item.id,
      name: item.name,
      title: item.title,
      path: item.path,
      shipped: item.projects.length,
      record: `EXP_${String(count - index).padStart(2, "0")}`,
      start,
      end: toFractionalYear(rawEnd ?? rawStart ?? "", start),
      startLabel: rawStart,
      endLabel: rawEnd,
      active: ACTIVE_PATTERN.test(item.year),
    };
  });

  const first = Math.min(...rows.map((row) => row.start));
  const last = Math.max(...rows.map((row) => row.end));
  // Tek rol varsa aralık sıfır olur ve bütün bölmeler NaN'a döner.
  const range = Math.max(last - first, 1);

  return (
    <div className="flex flex-col">
      <p className="nfo-glow tnum text-5xl leading-none text-primary">
        {Math.floor(last - first)}
      </p>
      <p className="mt-2 text-2xs text-muted-foreground">
        years shipping · since {Math.floor(first)}
      </p>

      <ul className="mt-8 flex flex-col gap-1">
        {rows.map((row, index) => {
          const left = ((row.start - first) / range) * 100;
          // En kısa rol bile görünür kalsın: taban genişlik bırakılıyor.
          const width = Math.max(((row.end - row.start) / range) * 100, 4);

          return (
            <li key={row.id}>
              <Link
                href={row.path}
                className="group -mx-4 block px-4 py-2.5 transition-colors hover:bg-primary/4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div className="flex min-w-0 items-baseline gap-3 max-sm:flex-col">
                    <span
                      aria-hidden
                      className="tnum shrink-0 text-2xs text-border transition-colors group-hover:text-primary"
                    >
                      {row.record}
                    </span>
                    <h3 className="text-xs uppercase tracking-[0.16em] transition-colors group-hover:text-primary">
                      {row.name}
                    </h3>
                    <span className="min-w-0 text-2xs lowercase text-muted-foreground">
                      {row.title}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-baseline gap-3 text-2xs text-muted-foreground">
                    {/*
                      Aktif rolün işareti dönemin açık ucunun kendisi:
                      "Present" amber yanıyor. Ayrı bir rozet, satırda
                      yer kaplamadan aynı şeyi söylüyordu.
                    */}
                    <time className="tnum">
                      {row.endLabel ? (
                        <>
                          {row.startLabel}
                          <span aria-hidden className="text-border">
                            {" – "}
                          </span>
                          <span
                            className={row.active ? "text-primary" : undefined}
                          >
                            {row.endLabel}
                          </span>
                        </>
                      ) : (
                        row.startLabel
                      )}
                    </time>
                    {row.shipped ? (
                      <>
                        <span aria-hidden className="text-border">
                          ·
                        </span>
                        <span className="tnum">
                          {String(row.shipped).padStart(2, "0")} shipped
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Boş ray: çubuğun yılın neresinde durduğu ancak bütün
                    aralık görünürse okunuyor. */}
                <div className="mt-2 h-3 w-full bg-border/60">
                  {/*
                    Opaklık inline değil değişkende: satırın üzerine
                    gelindiğinde `group-hover` onu tam parlaklığa çekebilsin.
                    Inline `opacity` yazılsaydı hover kuralı onu ezemezdi.
                  */}
                  <div
                    aria-hidden
                    className="h-full bg-primary opacity-[var(--bar-opacity)] transition-opacity group-hover:opacity-100"
                    style={
                      {
                        marginLeft: `${left}%`,
                        width: `${Math.min(width, 100 - left)}%`,
                        // Sparkline'daki opaklık rampasının aynısı: en yeni
                        // rol en parlak, geriye gidildikçe sönüyor.
                        "--bar-opacity": 1 - index * 0.22,
                      } as CSSProperties
                    }
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex items-baseline justify-between text-2xs text-muted-foreground">
        <span className="tnum">{Math.floor(first)}</span>
        <span aria-hidden className="mx-3 h-px flex-1 bg-border" />
        <span className="tnum">{Math.floor(last)}</span>
      </div>
    </div>
  );
}
