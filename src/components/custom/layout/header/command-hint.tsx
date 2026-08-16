"use client";

import { COMMAND_PALETTE_EVENT } from "@/components/custom/command-palette";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";

/**
 * Komut paletinin keşfedilme yolu — ve mobilde tek gezinme yolu.
 *
 * Rozet üç kez elden geçti; sonunda kabul edilen şey şu: sorun boyut değil,
 * `⌘` glifinin kendisi. O karakter küçük puntoda okunmuyor, dört yapraklı
 * bir desene dönüşüp gürültü oluyor — ve platforma göre `Ctrl`e dönüşünce
 * düğmenin genişliği de zıplıyordu.
 *
 * O yüzden kısayol başlıktan tamamen çıktı: burada niyeti anlatan bir kelime
 * var, kısayolun kendisi ise paletin içinde, okunur bir puntoda duruyor.
 * Bir şeyi küçültmeye çalışmak yerine oradan kaldırmak doğru çözümdü.
 */
export function CommandHint() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT))}
      aria-label="Open command palette"
      className="gap-2 px-2.5 text-muted-foreground hover:text-primary"
    >
      <Menu aria-hidden className="size-4 sm:hidden" />
      <Search aria-hidden className="size-3.5 max-sm:hidden" />
      <span className="text-xs uppercase tracking-[0.16em] max-sm:hidden">
        search
      </span>
    </Button>
  );
}
