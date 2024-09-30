import React from 'react';
import Link from '../active-link';
import db from '@/db';

export default function Header() {
  const { nav } = db;
  return (
    <nav className="container sticky top-0 py-6 flex  gap-4 items-center z-50 w-full before:absolute before:w-full before:h-[200%] bg-gradient-to-b  before:pointer-events-none from-75% before:backdrop-blur-sm before:z-0 before:inset-0 before:[mask-image:linear-gradient(black,_transparent)] ">
      {nav.map(({ id, name, path }) => (
        <Link
          key={id}
          href={path}
          className="lowercase relative z-10 text-zinc-400 data-[active='true']:text-white"
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
