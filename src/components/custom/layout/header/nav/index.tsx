"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, Popover } from "radix-ui";
import { useState, useSyncExternalStore } from "react";
import type { NavigationItem } from "@/types/settings";

const mobileQuery = "(max-width: 600px)";
function subscribeViewport(onChange: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getMobileSnapshot = () => window.matchMedia(mobileQuery).matches;
const getServerSnapshot = () => false;

export default function Nav({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mobile = useSyncExternalStore(subscribeViewport, getMobileSnapshot, getServerSnapshot);

  const trigger = (
    <button className="navigation-trigger" type="button" aria-label="Open navigation">
      <span>Menu</span><Menu size={16} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
  const links = (
    <nav className="navigation-links" aria-label="Main navigation">
      {items.map((item) => {
        const active = item.path === "/" ? pathname === item.path : pathname.startsWith(item.path);
        return (
          <Link href={item.path} key={item.id} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
            <span>
              <span className="navigation-link-name">{item.name}</span>
              {item.description && <span className="navigation-link-description">{item.description}</span>}
            </span>
            <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        );
      })}
    </nav>
  );
  const closeIcon = <X size={16} strokeWidth={1.5} aria-hidden="true" />;

  if (mobile) {
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="navigation-overlay" />
          <Dialog.Content className="navigation-sheet" aria-describedby={undefined}>
            <div className="navigation-sheet-handle" aria-hidden="true" />
            <div className="navigation-panel-heading">
              <Dialog.Title>Navigation</Dialog.Title>
              <Dialog.Close className="navigation-close" aria-label="Close navigation">{closeIcon}</Dialog.Close>
            </div>
            {links}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="navigation-popover" align="end" sideOffset={12} collisionPadding={16} aria-label="Navigation">
          <div className="navigation-panel-heading">
            <span>Navigation</span>
            <Popover.Close className="navigation-close" aria-label="Close navigation">{closeIcon}</Popover.Close>
          </div>
          {links}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
