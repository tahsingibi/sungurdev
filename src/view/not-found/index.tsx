import settings from "@/lib/settings";
import Link from "next/link";
import { NotFoundTerminal } from "./terminal";

/**
 * 404.
 *
 * Terminal çıktısı zaten sayfanın dilinde; eklenen şey çıkış yolu. Buraya
 * düşen biri kaybolmuş demektir ve komut paletini tanıtmak için en doğru an
 * bu — o yüzden kısayol burada bağlantı listesinin *önünde* duruyor.
 */
export default function NotFoundView() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6 py-20 sm:py-28">
      <div className="w-full max-w-md text-left">
        <NotFoundTerminal />
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-2xs text-muted-foreground">
          press{" "}
          <kbd className="border border-border px-1.5 py-0.5 text-foreground">
            ⌘K
          </kbd>{" "}
          or{" "}
          <kbd className="border border-border px-1.5 py-0.5 text-foreground">
            /
          </kbd>{" "}
          to search everything
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-4">
          {settings.nav.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="text-2xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
