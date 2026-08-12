import { GithubIcon } from "@/components/custom/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import settings from "@/lib/settings";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/settings";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function ProjectRow({ project }: { project: Project }) {
  const primaryUrl = project.live || project.repo;

  return (
    <li className="group relative flex flex-col gap-4 border-b border-border p-4 transition-colors last:border-b-0 hover:bg-accent/40 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {primaryUrl ? (
              <Link
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline-offset-4 hover:underline"
              >
                {project.name}
                <ArrowUpRight className="ml-1 inline size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <h3 className="font-medium">{project.name}</h3>
            )}
          </div>

          {project.explain ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {project.explain}
            </p>
          ) : null}

          <p className="mt-2 font-pixel text-xs text-muted-foreground space-x-2">
            <Badge variant="ghost" className="px-0">{project?.year}</Badge>
            <Badge variant="secondary">{project.tech}</Badge>
          </p>
        </div>
      </div>

      {project.repo || project.live ? (
        <div className="flex shrink-0 items-center gap-1 sm:justify-end">
          {project.repo ? (
            <Button
              asChild
              variant="secondary"
              size="xs"
              className="font-mono text-2xs! uppercase"
            >
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon aria-hidden="true" />
                Github
              </Link>
            </Button>
          ) : null}
          {project.live ? (
            <Button
              asChild
              variant="secondary"
              size="xs"
              className="font-mono text-2xs! uppercase"
            >
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export default function WorksView() {
  const { experience, pages } = settings;
  const { heading, description } = pages.works;

  return (
    <div className="relative flex flex-col">
      <header className="flex flex-col gap-1 border-b border-border p-6">
        <h1 className="text-3xl">{heading}</h1>
        <p className="font-pixel text-sm text-muted-foreground">{description}</p>
      </header>

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
                  aria-label={`${item.name} bölümünün bağlantısı`}
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
                <ol className="overflow-hidden rounded-lg border border-border">
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
