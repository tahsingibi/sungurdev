import React from 'react';
import db from '@/db';
import Image from 'next/image';

export default function ProfileCard() {
  const { name, title, image, jobSeeking } = db;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center grow-0 shrink flex-wrap">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="size-16 aspect-square object-cover rounded-2xl"
        />
        <div className="flex flex-col shrink-0">
          <h2 className="text-xl font-medium">{name}</h2>
          <p className="opacity-60">{title}</p>
        </div>
      </div>
      {jobSeeking && (
        <span
          className="bg-green-700 size-3 flex relative rounded-full before:absolute before:size-full before:inset-0 before:rounded-full before:bg-green-600 before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:animate-ping before:origin-bottom-right before:z-[-1] after:absolute after:block after:text-sm after:content-[attr(data-content)] after:whitespace-nowrap after:bg-zinc-900 after:px-2 after:py-1 after:rounded after:origin-right after:scale-0 hover:after:scale-100 after:right-full after:-translate-x-4 after:-top-1/2 after:transition-all after:duration-75"
          data-content="Open to work"
        />
      )}
    </div>
  );
}
