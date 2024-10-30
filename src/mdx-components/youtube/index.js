import React from 'react';

export default function YouTube({ video }) {
  return (
    <div className="pb-4">
      <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full bg-black rounded-lg">
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
