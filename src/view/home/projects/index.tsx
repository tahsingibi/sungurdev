import { ProjectGrid } from "@/components/custom/project-grid";
import { SectionHeader } from "@/components/custom/section-header";
import settings from "@/lib/settings";

export default function Projects() {
  const { work, pages } = settings;
  const { path, heading, description } = pages.projects;
  // Ana sayfada dördü: ızgara iki sütun olduğu için çift sayı tam satır kapatıyor.
  const projects = work.slice(0, 4);

  return (
    <section className="flex flex-col">
      <SectionHeader
        heading={heading}
        description={description}
        href={path}
        meta={`${work.length} releases`}
      />
      <div className="px-6 pb-8">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
