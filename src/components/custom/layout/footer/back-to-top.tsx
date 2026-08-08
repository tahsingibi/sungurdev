"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      aria-label="Başa dön"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="size-3.5" />
    </Button>
  );
}
