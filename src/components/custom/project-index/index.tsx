import type { Project } from "@/types/settings";

/**
 * Proje dizini — bölümün üstünde yatay şerit.
 *
 * Blog dizininin aynısı, farklı veriyle: solda parlayan toplam ve künye,
 * sağda dağılım çubukları. Buradaki dağılım teknoloji — projelerin `tech`
 * alanı zaten virgülle ayrılmış bir liste, tek tek okunduğunda anlaşılmayan
 * şey (neyle çalışıldığı) toplandığında görünüyor.
 */

/** `"React, Websocket"` → `["react", "websocket"]` */
function toTechnologies(tech: string): string[] {
  return tech
    .split(/[,&]/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const technology of toTechnologies(project.tech)) {
      counts.set(technology, (counts.get(technology) ?? 0) + 1);
    }
  }

  // Yalnızca ilk dördü: kuyrukta bir kez geçen on teknoloji var ve hepsi
  // aynı boyda çubuk olarak çizilince dağılım değil liste oluyor.
  const technologies = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 4);

  const peak = Math.max(...technologies.map((item) => item.count), 1);
  const live = projects.filter((project) => project.live).length;
  const open = projects.filter((project) => project.repo).length;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      <div className="min-w-0">
        <p className="nfo-glow tnum text-5xl leading-none text-primary">
          {String(projects.length).padStart(2, "0")}
        </p>
        <p className="mt-2 text-2xs text-muted-foreground">
          releases · {counts.size} technologies
        </p>
        <p className="mt-1 text-2xs text-muted-foreground">
          <span className="tnum">{String(live).padStart(2, "0")}</span> live
          <span aria-hidden className="text-border">
            {" · "}
          </span>
          <span className="tnum">{String(open).padStart(2, "0")}</span> open
          source
        </p>
      </div>

      <dl className="flex w-full flex-col gap-2.5 sm:max-w-xs">
        {technologies.map((technology, index) => (
          <div key={technology.name} className="flex items-center gap-3">
            <dt className="w-24 shrink-0 truncate text-2xs lowercase text-muted-foreground">
              {technology.name}
            </dt>
            <dd className="flex min-w-0 flex-1 items-center gap-3">
              <span className="h-2.5 min-w-0 flex-1 bg-border/60">
                <span
                  aria-hidden
                  className="block h-full bg-primary"
                  style={{
                    width: `${(technology.count / peak) * 100}%`,
                    opacity: 1 - index * 0.18,
                  }}
                />
              </span>
              <span className="tnum shrink-0 text-2xs text-muted-foreground">
                {String(technology.count).padStart(2, "0")}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
