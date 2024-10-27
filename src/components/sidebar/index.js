import React from 'react';
import Avatar from '../avatar';
import db from '@/db';
import Link from '../active-link';
import { Icon } from '../icon';

export default function Sidebar() {
  const { slug, name, nav } = db;
  return (
    <div className="sm:col-span-4 flex  sm:flex-col gap-6 fixed w-full  inset-0 max-sm:p-4 sm:sticky top-0 sm:top-10 h-fit max-sm:flex-wrap z-50 max-sm:bg-zinc-950 max-sm:max-h-20 max-sm:has-[input:checked]:max-h-screen transition-all duration-300 ease-[cubic-bezier(1,_0.1,_1.9,_1.5)]">
      <input type="checkbox" className="sr-only peer" id="menu" />
      <div className="flex sm:flex-col gap-3 max-sm:w-fit relative z-10 sm:pl-3">
        <Link href="/">
          <Avatar
            image="/img/profile.jpeg"
            className="size-12 sm:size-16 sm:!rounded-2xl overflow-hidden"
          />
        </Link>
        <div className="flex flex-col max-sm:hidden">
          <h2 className="text-lg sm:text-2xl font-semibold lowercase">
            {name}
          </h2>
          <span className="text-zinc-500">@{slug}</span>
        </div>
      </div>

      <label
        className="ml-auto bg-white/5 size-12 rounded-lg flex items-center justify-center sm:hidden z-10"
        htmlFor="menu"
      >
        <Icon icon="list" className="text-white text-lg" />
      </label>
      <nav className="flex flex-col gap-1 w-full max-sm:clip-path-[inset(0_0_100%_0)] max-sm:opacity-0 max-sm:peer-checked:clip-path-[inset(0_0_0_0)] max-sm:peer-checked:opacity-100 z-10 transition-[clip-path,opacity]  ease-[cubic-bezier(0.4,_0,_0.2,_1)]">
        {nav.map(({ id, name, path, icon }) => (
          <Link
            key={id}
            href={path}
            className="flex items-center gap-2 px-3 py-2 text-zinc-500 hover:bg-white/5 rounded-lg data-[disabled='true']:text-zinc-700 data-[disabled='true']:hover:bg-transparent data-[disabled='true']:pointer-events-none data-[active='true']:text-white"
            data-disabled={path.startsWith('#')}
          >
            <Icon icon={icon} />
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
