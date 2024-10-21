import React from 'react';
import Link from '../active-link';
import db from '@/db';

export default function Header() {
  const { nav } = db;

  return (
    <nav className="container mb-8 sm:mt-8 p-1 sm:rounded-lg bg-black/5 border border-white/5 flex items-center gap-2 backdrop-blur sticky top-0 sm:top-8 z-50 ">
      {nav.map(({ id, name, path }) => (
        <Link
          key={id}
          href={path}
          className="lowercase relative z-10 text-zinc-400 px-3 py-1   data-[active='true']:rounded-md data-[active='true']:backdrop-blur-3xl data-[active='true']:text-white [text-shadow:0px_1px_#000] drop-shadow-lg"
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
