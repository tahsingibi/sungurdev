import React from 'react';
import Avatar from '../avatar';
import db from '@/db';
import Link from '../active-link';
import { Icon } from '../icon';

export default function Sidebar() {
  const { slug, name, nav } = db;
  return (
    <div className="sm:col-span-4 flex  sm:flex-col gap-6 fixed w-full  inset-0 max-sm:p-4 sm:sticky top-0 sm:top-10 h-fit max-sm:flex-wrap z-50 max-sm:bg-zinc-950 max-sm:max-h-20 max-sm:has-[input:checked]:max-h-full">
      <input type="checkbox" className="sr-only peer" id="menu" />
      <div className="flex sm:flex-col gap-3 max-sm:w-fit relative z-10">
        <Link href="/">
          <Avatar
            image="/img/profile.jpeg"
            className="size-12 sm:size-16 sm:!rounded-2xl overflow-hidden"
          />
        </Link>
        <div className="flex flex-col max-sm:hidden">
          <h2 className="text-lg sm:text-2xl capitalize font-semibold">
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
      <nav className="flex flex-col gap-1 w-full max-sm:max-h-0 max-sm:opacity-0 max-sm:peer-checked:max-h-full max-sm:peer-checked:opacity-100 z-10 transition-all ">
        {nav.map(({ id, name, path, icon }) => {
          return (
            <Link
              key={id}
              href={path}
              className="flex items-center gap-2 capitalize px-3 py-2 text-zinc-500 hover:bg-white/5 rounded-lg data-[disabled='true']:text-zinc-700 data-[disabled='true']:hover:bg-transparent data-[disabled='true']:pointer-events-none data-[active='true']: data-[active='true']:text-white"
              data-disabled={path.startsWith('#')}
            >
              <Icon icon={icon} />
              {name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
