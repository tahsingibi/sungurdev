"use client";

import { useTheme } from "@/components/custom/theme-provider";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    /*
      `richColors` kaldırıldı: doygun yeşil/kırmızı kutular sayfanın hiçbir
      yerinde olmayan bir palet getiriyordu. Bildirimler de arayüzün geri
      kalanı gibi — yumuşak köşe, saç teli çerçeve, popover zemini. İkon da
      nötr: bir kopyalama bildirimi vurgu rengini hak etmiyor.
    */
    <Sonner
      theme={resolvedTheme}
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-xl !border !border-border !bg-popover !text-sm !text-foreground !shadow-lg !shadow-black/25",
          description: "!text-xs !text-muted-foreground",
          actionButton: "!rounded-lg !bg-foreground !text-background",
          cancelButton: "!rounded-lg !bg-muted !text-muted-foreground",
          icon: "!text-muted-foreground",
        },
      }}
    />
  );
}
