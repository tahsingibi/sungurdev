import { BookOpen, Code2, Gamepad2, Radio, Sparkles, Terminal, Tv } from "lucide-react";
import Image from "next/image";
import type { ProjectLogo } from "@/types/settings";

const icons = {
  code: Code2,
  sparkles: Sparkles,
  tv: Tv,
  "book-open": BookOpen,
  radio: Radio,
  gamepad: Gamepad2,
  terminal: Terminal,
};

export function ProjectIcon({ name, logo, size = 23 }: { name?: string; logo?: ProjectLogo; size?: number }) {
  if (logo?.monochrome) {
    return (
      <span
        className="project-logo-monochrome"
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          maskImage: `url("${logo.src}")`,
          WebkitMaskImage: `url("${logo.src}")`,
        }}
      />
    );
  }

  if (logo) {
    return <Image className="project-logo" src={logo.src} alt="" width={size} height={size} sizes={`${size}px`} />;
  }

  const Icon = icons[name as keyof typeof icons] ?? Terminal;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
