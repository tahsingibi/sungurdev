"use client";

import { COMMAND_PALETTE_EVENT } from "@/components/custom/command-palette";
import { Menu, Search } from "lucide-react";

/**
 * Komut paletinin keşfedilme yolu — ve mobilde tek gezinme yolu.
 *
 * Kısayol glifini göstermiyor: `⌘` küçük puntoda okunmuyor ve platforma göre
 * `Ctrl`e dönünce düğmenin genişliği zıplıyordu. Burada niyeti anlatan bir
 * ikon var, kısayolun kendisi paletin içinde okunur puntoda duruyor.
 */
export function CommandHint() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT))}
      aria-label="Open command palette"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <Menu aria-hidden className="size-4 sm:hidden" />
      <Search aria-hidden className="size-4 max-sm:hidden" />
    </button>
  );
}
