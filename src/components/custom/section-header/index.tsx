import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  heading: string;
  description: string;
  href?: string;
  action?: ReactNode;
  eyebrow?: ReactNode;
  level?: "h1" | "h2";
  size?: "default" | "lg";
  bordered?: boolean;
}

function SectionTitle({
  heading,
  description,
  linked = false,
  level = "h2",
  size = "default",
}: Pick<SectionHeaderProps, "heading" | "description" | "level" | "size"> & {
  linked?: boolean;
}) {
  const Heading = level;

  return (
    <div className="min-w-0">
      <Heading
        className={cn(
          "flex items-center gap-2 tracking-tight",
          size === "lg" ? "text-3xl sm:text-4xl" : "text-3xl",
        )}
      >
        {heading}
        {linked ? (
          <ArrowUpRight className="size-5 origin-bottom-left text-muted-foreground opacity-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
        ) : null}
      </Heading>
      <p
        className={cn(
          "mt-1",
          size === "lg"
            ? "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            : "font-pixel text-sm text-muted-foreground",
        )}
      >
        {description}
      </p>
    </div>
  );
}

export function SectionHeader({
  heading,
  description,
  href,
  action,
  eyebrow,
  level,
  size = "default",
  bordered = false,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex gap-4 max-sm:flex-col sm:items-end sm:justify-between",
        size === "lg" ? "p-6 sm:p-8" : "p-6",
        bordered && "border-b border-border/60",
      )}
    >
      <div className="min-w-0 flex-1">
        {eyebrow}
        {href ? (
          <Link href={href} className="group min-w-0">
            <SectionTitle
              heading={heading}
              description={description}
              level={level}
              size={size}
              linked
            />
          </Link>
        ) : (
          <SectionTitle
            heading={heading}
            description={description}
            level={level}
            size={size}
          />
        )}
      </div>
      {action}
    </header>
  );
}
