import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/settings";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ProjectRow({ project }: { project: Project }) {
  const primaryUrl = project.live || project.repo;

  return (
    <li className="border-b border-border last:border-b-0">
      <div className="grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          {primaryUrl ? (
            <Link
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:link-underline"
            >
              <h3 className="truncate text-lg font-medium tracking-tight">
                {project.name}
                <ArrowUpRight className="ml-1.5 inline size-4 text-muted-foreground opacity-35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
              </h3>
            </Link>
          ) : (
            <h3 className="truncate text-lg font-medium tracking-tight">
              {project.name}
            </h3>
          )}

          {project.explain ? (
            <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-muted-foreground">
              {project.explain}
            </p>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {project.year ? (
              <span className="font-pixel text-xs text-muted-foreground">
                {project.year}
              </span>
            ) : null}
            <Badge variant="secondary">{project.tech}</Badge>
          </div>
        </div>

        {project.repo || project.live ? (
          <div className="flex shrink-0 items-center gap-1 max-sm:w-fit">
            {project.repo ? (
              <Button asChild variant="secondary" size="xs">
                <Link
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            ) : null}
            {project.live ? (
              <Button asChild variant="secondary" size="xs">
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
      </div>
    </li>
  );
}
