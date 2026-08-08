import { GithubIcon, LinkedInIcon, XTwitterIcon } from "@/components/custom/icons";
import { ThemeToggle } from "@/components/custom/theme-provider/theme-toggle";
import { Button } from "@/components/ui/button";
import settings from "@/lib/settings";
import { Mail } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { BackToTop } from "./back-to-top";

const SOCIAL_ICONS = {
  "twitter-x": XTwitterIcon,
  linkedin: LinkedInIcon,
  github: GithubIcon,
  mail: Mail,
};

export default function Footer() {
  const { name, slug, social, blog, analytics } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div className="divider-screen divider-hatch" aria-hidden="true" />

      <div className="flex flex-col items-center gap-1.5 p-6 text-center font-mono text-sm text-foreground/50">
        <p>
          Crafted by <span className="text-foreground">{name}</span>{" "}
          <span className="text-foreground/40">@{slug}</span>
        </p>
        <p>
          Built with <span className="text-foreground">Next.js, Tailwind CSS</span>
        </p>
        <p>
          Source{" "}
          <a
            href={blog.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            GitHub
          </a>
        </p>
        {!!analytics.googleAnalyticsId && (
          <p>
            Analytics <span className="text-foreground">Google Analytics</span>
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 border-t px-6 py-4">
        <div className="flex items-center gap-1">
          {social.map((link) => {
            const Icon = SOCIAL_ICONS[
              link.icon as keyof typeof SOCIAL_ICONS
            ] as ComponentType<{ className?: string }> | undefined;
            return (
              <Link key={link.id} href={link.path} target="_blank">
                <Button size="icon-sm" variant="ghost">
                  {Icon ? <Icon className="size-3.5" /> : null}
                </Button>
              </Link>
            );
          })}
          <ThemeToggle />
          <BackToTop />
        </div>
        <span className="font-pixel text-xs upp text-zinc-400">
          © {year} {name}
        </span>
      </div>
    </footer>
  );
}
