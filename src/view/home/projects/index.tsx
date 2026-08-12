import { ProjectRow } from "@/components/custom/project-row";
import { SectionHeader } from "@/components/custom/section-header";
import settings from "@/lib/settings";

export default function Projects() {
  const { work, pages } = settings;
  const { path, heading, description } = pages.projects;
  const projects = work.slice(0, 3);

  return (
    <section className="relative flex flex-col">
      <SectionHeader heading={heading} description={description} href={path} />

      <ol className="mx-6 mb-6 overflow-hidden rounded-xl border border-border bg-card/40 shadow-soft">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ol>
    </section>
  );
}
