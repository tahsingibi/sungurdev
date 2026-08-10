import settings from "@/lib/settings";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Experiences() {
  const { experience, pages, url } = settings;
  const { path, heading, description } = pages.works;

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

      {experience.map((exp, index) => (
        <Link
          key={exp.id}
          href={`${url}${exp.path}`}
          className="flex flex-col p-6 hover:bg-accent/50 border-b last:border-b-0"
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate text-xl">{exp.name}</h3>
            <span className="shrink-0 font-pixel text-xs upp text-zinc-400">
              {exp.year}
            </span>
          </div>
          <span className="font-pixel text-sm upp text-foreground/70">
            {exp.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
