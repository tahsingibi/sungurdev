import {
  GithubIcon,
  LinkedInIcon,
  XTwitterIcon,
} from "@/components/custom/icons";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import type { ComponentType } from "react";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "twitter-x": XTwitterIcon,
  linkedin: LinkedInIcon,
  github: GithubIcon,
  mail: Mail,
};

/**
 * Optik düzeltme.
 *
 * Marka ikonları aynı `viewBox`ta gelmiyor: X `0 0 1200 1227`, diğerleri
 * `0 0 24 24`. Aynı CSS boyutu verildiğinde bile glif kutunun farklı bir
 * oranını dolduruyor ve X yanındakilerden iri/uzun görünüyordu.
 *
 * Kutu herkeste sabit; içindeki glifin ölçeği ikon başına ayarlanıyor.
 */
const GLYPH_SCALE: Record<string, string> = {
  "twitter-x": "size-[0.78em]",
  linkedin: "size-[0.95em]",
  github: "size-[0.95em]",
  mail: "size-[1em]",
};

export function SocialIcon({
  name,
  className,
}: {
  /** `settings.social[].icon` değeri. */
  name: string;
  /** Kutu boyutu — `size-4` gibi. Glif buna göre ölçekleniyor. */
  className?: string;
}) {
  const Icon = ICONS[name];
  if (!Icon) return null;

  return (
    <span
      aria-hidden
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
    >
      <Icon className={GLYPH_SCALE[name] ?? "size-[0.95em]"} />
    </span>
  );
}
