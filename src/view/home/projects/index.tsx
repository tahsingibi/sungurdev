import { Row, RowMedia, Rows, Section } from "@/components/custom/section";
import settings from "@/lib/settings";
import Link from "next/link";

/**
 * İşler.
 *
 * Satırın kendisi bağlantı değil: her projenin iki ayrı hedefi var (kaynak
 * ve canlı) ve ikisi de satırın içinde kendi bağlantısı olarak duruyor —
 * satırı tek bir yere bağlayıp içine ikinci bağlantı koymak hem geçersiz
 * hem klavyeyle gezilemez bir yapı doğuruyordu.
 */
export default function Projects() {
  const { work, pages } = settings;
  const projects = work.slice(0, 4);

  return (
    <Section
      id="works"
      title="works"
      link={{ href: pages.works.path }}
    >
      <Rows>
        {projects.map((project, index) => (
          <Row
            key={project.id}
            /* Numara sıradaki yeri değil, kaçıncı iş olduğunu söylüyor:
               liste yeniden eskiye aktığı için en üstteki en büyük numarayı
               taşıyor. Kırpılmış listede de arşivdeki gerçek sırasını
               koruyor — ana sayfada 07'den başlaması, arkada üç iş daha
               olduğunu kendiliğinden anlatıyor. */
            media={
              <RowMedia>
                {String(work.length - index).padStart(2, "0")}
              </RowMedia>
            }
            title={project.name}
            subtitle={project.explain}
            after={
              <span className="flex shrink-0 items-center gap-2.5 font-mono text-2xs lowercase">
                {project.repo ? (
                  <Link
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    github
                  </Link>
                ) : null}
                {project.live ? (
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    live
                  </Link>
                ) : null}
              </span>
            }
          />
        ))}
      </Rows>
    </Section>
  );
}
