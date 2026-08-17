"use client";

import { COMMAND_PALETTE_EVENT } from "@/components/custom/command-palette";
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
 *
 * Çerçevesi arşiv sayfasındaki `rss` düğmesiyle aynı: köşesiz kutu, ince
 * kenarlık, hover'da amber. Genel amaçlı `Button` bileşeni burada kendi
 * dolgu ve punto ölçeğini getiriyordu.
 */
export function CommandHint() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT))}
      aria-label="Open command palette"
      className="inline-flex shrink-0 items-center gap-1.5 border border-border px-2 py-1 text-2xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
    >
      <Menu aria-hidden className="size-4 sm:hidden" />
      <Search aria-hidden className="size-3 max-sm:hidden" />
      <span className="max-sm:hidden">search</span>
    </button>
  );
}
