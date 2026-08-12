import { ProjectRow } from "@/components/custom/project-row";
import { SectionHeader } from "@/components/custom/section-header";
import settings from "@/lib/settings";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function WorksView() {
  const { experience, pages } = settings;
  const { heading, description } = pages.works;

  return (
    <div className="relative flex flex-col">
      <SectionHeader heading={heading} description={description} level="h1" bordered />

      {experience.map((item, experienceIndex) => {
        const anchor = item.path.split("#")[1] || `experience-${item.id}`;

        return (
          <section
            key={item.id}
            id={anchor}
            className={cn(
              "relative scroll-mt-24",
              experienceIndex > 0 && "border-t border-border",
            )}
          >
            <header className="relative flex flex-col gap-1 p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl">{item.name}</h2>
                <time className="shrink-0 font-pixel text-xs text-muted-foreground">
                  {item.year}
                </time>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-pixel text-sm text-foreground/70">
                  {item.title}
                </p>
                <Link
                  href={item.path}
                  aria-label={`Link to the ${item.name} section`}
                  className="font-pixel text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {`EXP_${String(experience.length - experienceIndex).padStart(2, "0")}`}
                </Link>
              </div>
            </header>

            <div
              dangerouslySetInnerHTML={{ __html: item.description }}
              className="px-6 pb-6 text-foreground/75 [&_.mark]:font-black [&_a]:underline [&_a]:underline-offset-4 [&_li+li]:mt-2 [&_li]:pl-1 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
            />

            {item.projects.length > 0 ? (
              <div className="px-6 pb-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="font-mono text-xs uppercase text-muted-foreground">
                    Projects
                  </h3>
                  <span className="font-mono text-xs uppercase text-muted-foreground">
                    {String(item.projects.length).padStart(2, "0")} entries
                  </span>
                </div>
                <ol className="overflow-hidden rounded-xl border border-border bg-card/40 shadow-soft">
                  {item.projects.map((project) => (
                    <ProjectRow key={project.id} project={project} />
                  ))}
                </ol>
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
