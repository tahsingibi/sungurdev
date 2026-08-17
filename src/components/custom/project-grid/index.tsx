import { Panel } from "@/components/custom/panel";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/settings";
import { ArrowUpRight } from "lucide-react";

/**
 * Proje ızgarası — kayıt kutuları.
 *
 * Kartlar bitişik hücrelerdi ve aralarındaki çizgiyi ızgaranın kendi zemini
 * çiziyordu; sayfanın geri kalanı çerçeveli ayrı kutulara dönünce bu tek
 * başına kalan bir dil oldu. Artık her proje kendi paneli: etiketi kayıt
 * numarası, sağ üstte canlı işareti ve yıl, gövdesinde ad + açıklama, dipte
 * teknoloji satırı.
 *
 * Tek sayıda proje kalınca doldurulacak boş hücre de kalmadı — kutular
 * arasında zemin değil boşluk var.
 */
export function ProjectGrid({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-4",
        // Tek kayıt varsa iki sütuna bölmek yanlış: kart yarım genişlikte
        // kalıyor ve yanı boş duruyor.
        projects.length > 1 && "sm:grid-cols-2",
        className,
      )}
    >
      {projects.map((project, index) => {
        const url = project.live || project.repo;
        const record = `rel_${String(index + 1).padStart(3, "0")}`;

        const body = (
          <div className="flex h-full flex-col">
            <div className="flex items-baseline gap-2">
              <h3 className="min-w-0 flex-1 text-xs uppercase tracking-[0.14em] transition-colors group-hover:text-primary">
                {project.name}
              </h3>
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

            <p className="mt-auto pt-6 text-2xs lowercase text-muted-foreground">
              {project.tech}
            </p>
          </div>
        );

        const action =
          project.live || project.year ? (
            <span className="flex shrink-0 items-baseline gap-2 text-2xs text-muted-foreground">
              {project.live ? (
                <span aria-label="live" title="live" className="text-primary">
                  ●
                </span>
              ) : null}
              {project.year ? (
                <span className="tnum">{project.year}</span>
              ) : null}
            </span>
          ) : undefined;

        return (
          <li key={project.id} className="flex">
            <Panel
              label={record}
              action={action}
              href={url || undefined}
              external={Boolean(url)}
              className="w-full"
            >
              {body}
            </Panel>
          </li>
        );
      })}
    </ul>
  );
}
