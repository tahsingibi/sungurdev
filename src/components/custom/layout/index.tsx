import { CommandPalette } from "@/components/custom/command-palette";
import type { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="reference-shell">
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <CommandPalette />
    </div>
  );
}
