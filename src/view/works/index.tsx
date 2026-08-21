import { PageHeader } from "@/components/custom/page-header";
import { Row, RowMedia, Rows, Section } from "@/components/custom/section";
import settings from "@/lib/settings";
import Link from "next/link";

/**
 * Deneyim dökümü.
 *
 * Her rol kendi bölümü: künye satırı, anlatı, çıkan işler. Ana sayfada bu
 * kayıtların yalnızca tek satırlık hâli var; burada tamamı duruyor.
 *
 * Sayfanın başında bir zaman çizelgesi grafiği vardı ve kaldırıldı: rollerin
 * dönemleri zaten her bölümün künyesinde yazıyor, çubuklar aynı şeyi ikinci
 * kez söylüyordu.
 */
export default function WorksView() {
  const { experience, pages } = settings;
  const { heading, description } = pages.works;

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        heading={heading}
        description={description}
        meta={`${String(experience.length).padStart(2, "0")} roles`}
      />

      {experience.map((item) => {
        const anchor = item.path.split("#")[1] || `experience-${item.id}`;

        return (
          <Section
            key={item.id}
            id={anchor}
            title={item.name}
            meta={item.year}
            className="scroll-mt-8"
          >
            <p className="font-mono text-2xs lowercase text-muted-foreground">
              {item.title}
              {item.projects.length ? (
                <>
                  <span aria-hidden className="text-border">
                    {" · "}
                  </span>
                  <span className="tnum">
                    {String(item.projects.length).padStart(2, "0")} shipped
                  </span>
                </>
              ) : null}
            </p>

            {/*
              Anlatı sans ve gövde puntosunda: bunlar sayfanın en uzun
              blokları, mono'da okuma hızını düşürüyor.
            */}
            <div
              dangerouslySetInnerHTML={{ __html: item.description }}
              className="mt-2 text-sm leading-loose text-muted-foreground [&_.mark]:text-foreground [&_a:hover]:decoration-current [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_li+li]:mt-1.5 [&_li]:pl-1 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-border"
            />

            {item.projects.length ? (
              <Rows>
                {item.projects.map((project, index) => (
                  <Row
                    key={project.id}
                    /* En eski iş 01: liste yeniden eskiye aktığı için
                       numara ters sayıyor. */
                    media={
                      <RowMedia>
                        {String(item.projects.length - index).padStart(2, "0")}
                      </RowMedia>
                    }
                    title={project.name}
                    subtitle={[project.tech, project.year]
                      .filter(Boolean)
                      .join(" · ")}
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
            ) : null}
          </Section>
        );
      })}
    </div>
  );
}
