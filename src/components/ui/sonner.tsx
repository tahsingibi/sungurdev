"use client";

import { useTheme } from "@/components/custom/theme-provider";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    /*
      `richColors` kaldırıldı: doygun yeşil/kırmızı kutular sayfanın hiçbir
      yerinde olmayan bir palet getiriyordu. Bildirimler de arayüzün geri
      kalanı gibi — köşesiz, saç teli çerçeveli, mono, vurgu amber.
    */
    <Sonner
      theme={resolvedTheme}
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-none !border !border-border !bg-popover !font-mono !text-xs !text-foreground !shadow-xl !shadow-black/50",
          description: "!text-muted-foreground",
          actionButton: "!rounded-none !bg-primary !text-primary-foreground",
          cancelButton: "!rounded-none !bg-muted !text-muted-foreground",
          icon: "!text-primary",
        },
      }}
    />
  );
}
