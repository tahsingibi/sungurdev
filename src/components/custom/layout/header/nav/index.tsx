"use client";

import settings from "@/lib/settings";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function isActivePath(itemPath: string, pathname: string) {
  return itemPath === "/" ? pathname === "/" : pathname.startsWith(itemPath);
}

/**
 * Gezinme.
 *
 * Aktif olan altı çizili ve tam kontrastta; kayan gösterge şeridi kalktı.
 * Üç bağlantılı bir menüde o şerit, anlatmadığı bir şeyi anlatıyormuş gibi
 * duruyordu — altı çizgi aynı bilgiyi hareket etmeden veriyor.
 */
export default function Nav() {
  const { nav: navItems } = settings;
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4 text-sm">
      {navItems.map((item) => {
        const isActive = isActivePath(item.path, pathname);
        return (
          <Link
            key={item.id}
            href={item.path}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-muted-foreground transition-colors hover:text-foreground",
              isActive &&
                "text-foreground underline decoration-border underline-offset-4",
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
