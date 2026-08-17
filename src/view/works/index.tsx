import { ExperienceTimeline } from "@/components/custom/experience-timeline";
import { Panel } from "@/components/custom/panel";
import { ProjectGrid } from "@/components/custom/project-grid";
import { SectionHeader } from "@/components/custom/section-header";
import settings from "@/lib/settings";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Deneyim dökümü.
 *
 * İki tasarım denendi ve ikisi de tutmadı: dört köşeye dağılmış başlık
 * bilgisi okunmuyordu, yandaki sabit künye paneli ise sağ sütunu o kadar
 * daraltıyordu ki proje adları sarıp dağılıyordu — üstelik panelin altında
 * kocaman bir boşluk kalıyordu.
 *
 * Bu hâl tam genişliğe dönüyor ama bilgiyi *tek bir künye satırında*
 * topluyor: ünvan · dönem · çıkan iş. Anlatı altında tam genişlikte akıyor,
 * işler ızgarada. Hiçbir şey birbirini daraltmıyor.
 */
export default function WorksView() {
  const { experience, pages } = settings;
  const { heading, description } = pages.works;

  const shipped = experience.reduce(
    (sum, item) => sum + item.projects.length,
    0,
  );

  return (
    <div className="flex flex-col">
      <SectionHeader
        heading={heading}
        description={description}
        level="h1"
        meta={`${experience.length} roles`}
        bordered
      />

      {/*
        Ana sayfadaki zaman çizelgesinin aynısı, burada içindekiler olarak
        çalışıyor: satırlar aşağıdaki bölümlerin çapalarına gidiyor, yani
        sayfanın haritası hem şeklini gösteriyor hem gezinmeyi sağlıyor.
      */}
      <div className="border-b border-border px-6 py-8">
        <Panel
          label="timeline"
          action={
            <span className="tnum text-2xs text-muted-foreground">
              {String(shipped).padStart(2, "0")} shipped
            </span>
          }
        >
          <ExperienceTimeline items={experience} />
        </Panel>
      </div>

      {experience.map((item, experienceIndex) => {
        const anchor = item.path.split("#")[1] || `experience-${item.id}`;
        const record = `EXP_${String(experience.length - experienceIndex).padStart(2, "0")}`;

        return (
          <section
            key={item.id}
            id={anchor}
            className={cn(
              "scroll-mt-24 px-6 py-8",
              experienceIndex > 0 && "border-t border-border",
            )}
          >
            {/* Künye: ad solda, kayıt numarası sağda, meta tek satırda. */}
            <header className="border-l-2 border-primary/50 pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-sm uppercase tracking-[0.18em]">
                  {item.name}
                </h2>
                <Link
                  href={item.path}
                  aria-label={`Link to the ${item.name} section`}
                  className="shrink-0 text-2xs text-muted-foreground transition-colors hover:text-primary"
                >
                  {record}
                </Link>
              </div>

              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xs text-muted-foreground">
                <span className="lowercase">{item.title}</span>
                <span aria-hidden className="text-border">
                  ·
                </span>
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
            </header>

            {/*
              Anlatı sans: uzun paragraflar mono'da okuma hızını düşürüyor ve
              buradaki metinler sayfanın en uzun blokları.
            */}
            <div
              dangerouslySetInnerHTML={{ __html: item.description }}
              className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground [&_.mark]:text-foreground [&_a:hover]:text-primary [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_li+li]:mt-1.5 [&_li]:pl-1 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
            />

            {item.projects.length > 0 ? (
              <div className="mt-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="nfo-tag shrink-0 text-2xs uppercase tracking-[0.3em] text-primary">
                    shipped
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-border" />
                </div>
                <ProjectGrid projects={item.projects} />
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
