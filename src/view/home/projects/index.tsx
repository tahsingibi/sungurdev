import { Panel } from "@/components/custom/panel";
import { ProjectGrid } from "@/components/custom/project-grid";
import { ProjectIndex } from "@/components/custom/project-index";
import settings from "@/lib/settings";
import Link from "next/link";

/**
 * Proje bandı — dizin şeridi + kartlar.
 *
 * Blog bölümüyle aynı kurgu: üstte bölümü tek bakışta özetleyen şerit,
 * altında kayıt kutuları. Şerit bütün kayıtları sayıyor, ızgarada ise
 * yalnızca ilk dördü var — gerisi bölüm başlığındaki bağlantıda.
 */
export default function Projects() {
  const { work, pages } = settings;
  const { path, heading, description } = pages.projects;
  const projects = work.slice(0, 4);

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-4 px-6 pb-8">
        <Panel
          label="index"
          action={
            <Link
              href={path}
              className="text-2xs text-muted-foreground transition-colors hover:text-primary"
            >
              all →
            </Link>
          }
        >
          <ProjectIndex projects={work} />
        </Panel>

        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
