"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { useState } from "react";
import type { GalleryPhoto } from "@/types/settings";

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const photo = photos[selected ?? 0];
  const move = (direction: number) => {
    setSelected((index) => ((index ?? 0) + direction + photos.length) % photos.length);
  };

  if (!photo) return null;

  return (
    <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <div className="reference-gallery" aria-label="My photography and illustrations">
        {[0, 1, 2].map((column) => (
          <div className={`reference-gallery-column gallery-column-${column}`} key={column}>
            {photos.filter((_item, index) => Math.floor(index * 3 / photos.length) === column).map((item) => {
              const index = photos.indexOf(item);
              return (
                <Dialog.Trigger key={item.id} asChild>
                  <button className="reference-photo" onClick={() => setSelected(index)} aria-label={`Enlarge: ${item.name}`}>
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      sizes="(max-width: 600px) 30vw, 214px"
                    />
                  </button>
                </Dialog.Trigger>
              );
            })}
          </div>
        ))}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="gallery-overlay" />
        <Dialog.Content
          className="gallery-dialog"
          aria-describedby={undefined}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          }}
        >
          <Dialog.Close className="gallery-close" aria-label="Close gallery"><X size={22} /></Dialog.Close>
          <div className="gallery-large-image">
            <Image key={photo.src} src={photo.src} fill sizes="(max-width: 800px) 90vw, 900px" alt={photo.name} />
          </div>
          <div className="gallery-caption">
            <Dialog.Title>{photo.name}</Dialog.Title>
            <div className="gallery-controls">
              <button aria-label="Previous photo" onClick={() => move(-1)}><ArrowLeft size={20} /></button>
              <span aria-live="polite">{(selected ?? 0) + 1} / {photos.length}</span>
              <button aria-label="Next photo" onClick={() => move(1)}><ArrowRight size={20} /></button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
