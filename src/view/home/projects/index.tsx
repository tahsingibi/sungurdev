import { Button } from "@/components/ui/button";
import settings from "@/lib/settings";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const { work, pages } = settings;
  const { path, heading, description } = pages.projects;
  const projects = work.slice(0, 3);

  return (
    <div className="flex flex-col relative">
      <Link href={path} className="group w-full flex flex-1 flex-col p-6">
        <h2 className="text-3xl">
          {heading}{" "}
          <ArrowUpRight className="inline scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all origin-left ml-auto" />
        </h2>
        <span className="font-pixel text-sm upp text-zinc-400">
          {description}
        </span>
      </Link>
      <div className="divider-screen" aria-hidden="true" />

      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-end justify-between gap-3 p-6 border-b last:border-b-0"
        >
          <div className="min-w-0 flex flex-col gap-1">
            <Link href={project?.live || project?.repo || "#"} className="group">
              <h3 className="truncate text-xl ">
                {project.name}
                <ArrowUpRight className="inline scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all origin-left ml-auto size-4 ms-2!" />
              </h3>
            </Link>
            {project.explain && (
              <p className="text-sm text-foreground/70">{project.explain}</p>
            )}
          </div>
          {(project.repo || project.live) && (
            <div className="flex shrink-0 items-center gap-1">
              {project.repo && (
                <Link
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    className="font-mono uppercase text-2xs!"
                    size="xs"
                  >
                    Github
                  </Button>
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    className="font-mono uppercase text-2xs!"
                    size="xs"
                  >
                    Live
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
