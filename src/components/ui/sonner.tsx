"use client";

import { useTheme } from "@/components/custom/theme-provider";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme}
      richColors
      closeButton
      position="bottom-right"
    />
  );
}
