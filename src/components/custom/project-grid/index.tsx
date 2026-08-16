import { cn } from "@/lib/utils";
import type { Project } from "@/types/settings";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Proje listesi — kart ızgarası.
 *
 * Satır biçiminde çalışmıyordu: projelerin çoğunda yıl yok, o yüzden sol
 * sütun boş kalıyor ve her satır yarım görünüyordu. Adlar da uzun olduğu
 * için tek satıra sığmayıp sarıyor, canlı noktası alt satıra düşüyordu.
 *
 * Kart, bu içeriğin doğal şekli: ad + açıklama + teknoloji bir arada duruyor,
 * yıl varsa görünüyor yoksa yer kaplamıyor, ve ızgara boşluğu doldurmak
 * yerine kullanıyor.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  /*
   * Tek sayıda proje varsa son satırda bir hücre boş kalıyor ve ızgaranın
   * ayırıcı zemini orada gri bir blok olarak görünüyordu. Dolgu hücresi
   * satırı kapatıyor — iki sütun sabit olduğu için bu deterministik.
   */
  const needsFiller = projects.length > 1 && projects.length % 2 === 1;

  return (
    <ol
      className={cn(
        "grid gap-px bg-border",
        // Tek kayıt varsa iki sütuna bölmek yanlış: kart yarım genişlikte
        // kalıyor ve yanındaki ayırıcı çizgi bir şey ayırmıyor.
        projects.length > 1 && "sm:grid-cols-2",
      )}
    >
      {projects.map((project, index) => {
        const url = project.live || project.repo;
        const id = String(index + 1).padStart(3, "0");

        const inner = (
          <>
            <div className="flex items-baseline gap-2">
              <span aria-hidden className="tnum shrink-0 text-2xs text-border">
                {id}
              </span>
              <h3 className="min-w-0 flex-1 text-xs uppercase tracking-[0.14em] transition-colors group-hover:text-primary">
                {project.name}
              </h3>
              {project.live ? (
                <span
                  aria-label="live"
                  title="live"
                  className="shrink-0 text-2xs text-primary"
                >
                  ●
                </span>
              ) : null}
              {url ? (
                <ArrowUpRight
                  aria-hidden
                  className="size-3 shrink-0 text-border transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              ) : null}
            </div>

            {project.explain ? (
              <p className="mt-2 text-2xs leading-relaxed text-muted-foreground">
                {project.explain}
              </p>
            ) : null}

            <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pt-4 text-2xs text-muted-foreground">
              <span className="lowercase">{project.tech}</span>
              {project.year ? (
                <span className="tnum shrink-0">{project.year}</span>
              ) : null}
            </div>
          </>
        );

        /*
         * `flex-1 w-full`: `li` bir flex kabı ve çocuk yalnızca içeriği
         * kadar genişliyordu; hücrenin kalanında ızgaranın kendi zemini
         * (ayırıcı çizgi rengi) gri bir blok olarak görünüyordu.
         */
        const className =
          "group flex h-full w-full flex-1 flex-col bg-background p-4 transition-colors hover:bg-primary/[0.04]";

        return (
          <li key={project.id} className="flex">
            {url ? (
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </Link>
            ) : (
              <div className={className}>{inner}</div>
            )}
          </li>
        );
      })}
      {needsFiller ? (
        <li aria-hidden className="hidden bg-background sm:block" />
      ) : null}
    </ol>
  );
}
