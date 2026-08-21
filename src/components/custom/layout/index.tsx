import { CommandPalette } from "@/components/custom/command-palette";
import React from "react";
import Footer from "./footer";
import Header from "./header";

/**
 * Sayfa kabuğu — v1'in dar kolonu.
 *
 * 490px, ortalanmış, çerçevesiz. Genişlik keyfi değil: bu kolonda bir satır
 * yaklaşık 65 karakter tutuyor, yani okuma genişliğinin tam ortası. Sayfayı
 * bölümlere ayıran şey de çizgi değil boşluk (`gap-12`) — kutu içinde kutu
 * kurmak yerine hava bırakılıyor.
 *
 * `@container`: ASCII banner punto'sunu bu kolonun genişliğinden hesaplıyor
 * (bkz. `.ascii-banner`), viewport'tan değil.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container mx-auto flex min-h-screen w-full max-w-[490px] flex-col gap-12 px-4">
      <Header />
      <main className="flex flex-col gap-12">{children}</main>
      <Footer />
      <CommandPalette />
    </div>
  );
}
