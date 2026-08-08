"use client";

import { useTheme, type Theme } from "@/components/custom/theme-provider";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

const CYCLE: Theme[] = ["system", "dark", "light"];

const ICONS: Record<Theme, typeof Sun> = {
  system: Monitor,
  dark: Moon,
  light: Sun,
};

const LABELS: Record<Theme, string> = {
  system: "Sistem",
  dark: "Koyu",
  light: "Açık",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = ICONS[theme];

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      aria-label={`Tema: ${LABELS[theme]}. Değiştirmek için tıklayın.`}
      onClick={() =>
        setTheme(CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length])
      }
    >
      <Icon className="size-4" />
    </Button>
  );
}
