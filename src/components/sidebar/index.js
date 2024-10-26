import React from 'react';
import Avatar from '../avatar';
import db from '@/db';
import Link from '../active-link';
import { Icon } from '../icon';

export default function Sidebar() {
  const { slug, name, nav } = db;
  return (
    <div className="col-span-4 flex flex-col gap-6 !sticky top-20">
      <div className="flex flex-col gap-3">
        <Avatar
          image="/img/profile.jpeg"
          className="size-16 !rounded-2xl overflow-hidden"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl capitalize font-semibold font-geist">
            {name}
          </h2>
          <span className="text-zinc-500">@{slug}</span>
        </div>
      </div>
      <nav className="flex flex-col gap-1 -ml-3">
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
