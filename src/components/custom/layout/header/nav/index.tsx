"use client";

import settings from "@/lib/settings";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const NAV_LINK_CLASSNAME =
  "inline-block font-mono text-xs font-medium uppercase text-muted-foreground transition-colors hover:text-foreground";

function isActivePath(itemPath: string, pathname: string) {
  return itemPath === "/" ? pathname === "/" : pathname.startsWith(itemPath);
}

export default function Nav() {
  const { nav: navItems } = settings;
  const pathname = usePathname();
  const linkRefs = useRef(new Map<number, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const activeItem = navItems.find((item) => isActivePath(item.path, pathname));
    const el = activeItem ? linkRefs.current.get(activeItem.id) : undefined;
    setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [pathname, navItems]);

  /*
   * Dar ekranda gizli: üç bağlantı yan yana yer kaplıyordu ve hepsi zaten
   * komut paletinin içinde. Mobilde gezinme başlıktaki menü ikonundan
   * (CommandHint) yürüyor.
   */
  return (
    <nav className="relative hidden items-center gap-4 sm:flex">
      {navItems.map((item) => {
        const isActive = isActivePath(item.path, pathname);
        return (
          <Link
            key={item.id}
            href={item.path}
            ref={(node) => {
              if (node) linkRefs.current.set(item.id, node);
              else linkRefs.current.delete(item.id);
            }}
            className={cn(NAV_LINK_CLASSNAME, isActive && "text-primary")}
          >
            {item.name}
          </Link>
        );
      })}
      {/* -bottom-7 lands the indicator near Header's own border-b so the two
          read as one line. */}
      {indicator && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-7 h-0.5 rounded-sm bg-primary transition-[left,width] duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
    </nav>
  );
}
