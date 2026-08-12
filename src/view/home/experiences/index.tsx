import { SectionHeader } from "@/components/custom/section-header";
import settings from "@/lib/settings";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Experiences() {
  const { experience, pages } = settings;
  const { path, heading, description } = pages.works;

  return (
    <section className="relative flex flex-col">
      <SectionHeader heading={heading} description={description} href={path} />

      <ul className="mx-6 mb-6 overflow-hidden rounded-xl border border-border bg-card/40 shadow-soft">
        {experience.map((exp) => (
          <li key={exp.id} className="group border-b border-border last:border-b-0">
            <Link
              href={exp.path}
              className="grid gap-1 p-4 transition-colors hover:bg-secondary/60 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-3"
            >
              <div className="min-w-0">
                <h3 className="truncate text-lg font-medium tracking-tight">
                  {exp.name}
                  <ArrowUpRight className="ml-1.5 inline size-4 text-muted-foreground opacity-35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                </h3>
                <p className="mt-1 font-pixel text-xs text-muted-foreground">
                  {exp.title}
                </p>
              </div>
              <time className="shrink-0 font-pixel text-xs text-muted-foreground">
                {exp.year}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
