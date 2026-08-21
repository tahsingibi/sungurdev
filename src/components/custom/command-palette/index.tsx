"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import settings from "@/lib/settings";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

/** Paleti dışarıdan açmak için yayınlanan olay. */
export const COMMAND_PALETTE_EVENT = "command-palette:open";

/**
 * Komut paleti.
 *
 * Sayfanın "şaşırtan" katmanı burası: yüzey sakin bir belge olarak duruyor,
 * derinlik klavyeye bağlı. Gezinme, projeler, yazılar, bağlantılar ve tema
 * tek bir arama alanının arkasında.
 *
 * Kaynak `settings` — yani yeni bir proje ya da yazı eklendiğinde palet
 * kendiliğinden büyüyor, burada bakım gerekmiyor.
 *
 * Not: `cmdk` zaten bağımlılıklarda duruyordu ve hiçbir yere bağlanmamıştı;
 * bu bileşen onu ilk kez devreye alıyor.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K Windows/Linux, ⌘K macOS. `/` de açıyor: klavyeyle gezen
      // ziyaretçinin ilk denediği tuşlardan biri.
      const combo = (event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey);
      const slash =
        event.key === "/" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement);

      if (combo || slash) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    // Başlıktaki ipucu düğmesi de aynı paleti açıyor. Olay üzerinden
    // bağlanıyor ki durum yukarı taşınmasın ve başlık istemci bileşeni
    // olmak zorunda kalmasın.
    const onRequest = () => setOpen(true);

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_EVENT, onRequest);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_EVENT, onRequest);
    };
  }, []);

  /** Seçim sonrası paleti kapatıp eylemi çalıştırır. */
  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const go = useCallback(
    (path: string) => run(() => router.push(path)),
    [router, run],
  );

  const open_ = useCallback(
    (url: string) => run(() => window.open(url, "_blank", "noopener,noreferrer")),
    [run],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command"
      description="Search pages, projects, posts and links"
    >
      {/*
        Bu projedeki `CommandDialog` çocuklarını `<Command>` ile sarmalamıyor
        (stok shadcn sarmalıyor). Bağlam olmadan `CommandInput` cmdk store'unu
        bulamıyor ve "cannot read properties of undefined (reading 'subscribe')"
        ile düşüyor — sarmalama burada, tüketicide.
      */}
      <Command>
        <CommandInput placeholder="type a command or search…" />
        <CommandList>
          <CommandEmpty>nothing found.</CommandEmpty>

          <CommandGroup heading="go">
            {settings.nav.map((item) => (
              <CommandItem
                key={item.id}
                value={`go ${item.name} ${item.path}`}
                onSelect={() => go(item.path)}
              >
                {item.name}
                <CommandShortcut>{item.path}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="projects">
            {settings.work.map((project) => {
              const url = project.live || project.repo;
              return (
                <CommandItem
                  key={project.id}
                  value={`project ${project.name} ${project.explain ?? ""} ${project.tech ?? ""}`}
                  onSelect={() => (url ? open_(url) : undefined)}
                >
                  {project.name}
                  <CommandShortcut>{project.tech}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading="links">
            {settings.social.map((link) => (
              <CommandItem
                key={link.id}
                value={`link ${link.name} ${link.path}`}
                onSelect={() => open_(link.path)}
              >
                {link.name}
              </CommandItem>
            ))}
            {settings.resume ? (
              <CommandItem
                value="resume cv download"
                onSelect={() => open_(settings.resume as string)}
              >
                resume.pdf
              </CommandItem>
            ) : null}
          </CommandGroup>

          <CommandGroup heading="theme">
            <CommandItem
              value="theme toggle dark light"
              onSelect={() =>
                run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
              }
            >
              switch to {resolvedTheme === "dark" ? "light" : "dark"}
            </CommandItem>
          </CommandGroup>
        </CommandList>

        {/*
          Kısayol ipucu burada duruyor, başlıkta değil: bu satırda okunur bir
          punto için yer var. Rozeti başlıkta küçültmeye çalışmak `⌘` glifini
          okunmaz hâle getiriyordu.
        */}
        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-2xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-sm border border-border px-1.5 py-0.5 text-foreground">
              ↑↓
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-sm border border-border px-1.5 py-0.5 text-foreground">
              ↵
            </kbd>
            open
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <kbd className="rounded-sm border border-border px-1.5 py-0.5 text-foreground">
              esc
            </kbd>
            close
          </span>
        </div>
      </Command>
    </CommandDialog>
  );
}
