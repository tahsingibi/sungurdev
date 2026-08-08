import React from 'react';

export default function YouTube({ video }: { video: string }) {
  return (
    <div className="pb-4">
      <div className="relative h-0 max-w-full overflow-hidden bg-black pb-[56.25%]">
        <iframe
          title="YouTube video"
          src={`https://www.youtube.com/embed/${video}`}
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
