import type { Experience } from "@/types/settings";
import Link from "next/link";

/**
 * Deneyim listesi — kayıt blokları.
 *
 * Neden satır değil blok: elde üç kayıt var ve bunlar sayfanın en ağır
 * bilgisi. Tek satırlık bir listede üç şirket üç dakikada unutuluyordu;
 * blok hâlinde her biri kendi alanına sahip ve dönem, ünvan, çıkan iş sayısı
 * bir arada okunuyor.
 *
 * Soldaki amber ray hem hiyerarşiyi kuruyor hem üzerine gelince parlıyor:
 * satırın tamamının tıklanabilir olduğunu gösteren tek işaret o.
 */
export function ExperienceList({
  items,
  total,
}: {
  items: Experience[];
  /** Kayıt numaraları için toplam — `EXP_03`, `EXP_02` … */
  total?: number;
}) {
  const count = total ?? items.length;

  return (
    <ul className="flex flex-col gap-px bg-border">
      {items.map((item, index) => (
        <li key={item.id} className="bg-background">
          <Link
            href={item.path}
            className="group flex gap-4 border-l-2 border-border py-4 pl-4 pr-1 transition-colors hover:border-primary hover:bg-primary/[0.04]"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-sm uppercase tracking-[0.16em] transition-colors group-hover:text-primary">
                  {item.name}
                </h3>
                <span className="text-2xs lowercase text-muted-foreground">
                  {item.title}
                </span>
              </div>

              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xs text-muted-foreground">
                <time className="tnum">{item.year}</time>
                {item.projects.length ? (
                  <>
                    <span aria-hidden className="text-border">
                      ·
                    </span>
                    <span>
                      {String(item.projects.length).padStart(2, "0")} shipped
                    </span>
                  </>
                ) : null}
              </div>
            </div>

            <span
              aria-hidden
              className="shrink-0 text-2xs text-border transition-colors group-hover:text-primary"
            >
              {`EXP_${String(count - index).padStart(2, "0")}`}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
