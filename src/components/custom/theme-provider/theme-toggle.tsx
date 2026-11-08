"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/custom/theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:text-primary"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
