import React from 'react';
import db from '@/db';
import Link from 'next/link';
import { Icon } from '@/src/components/icon';

export default function Social() {
  const { social, resume, jobSeeking } = db;
  return (
    <div className="flex items-center gap-1 flex-wrap  [&>a]:shrink-0 [&>a]:bg-zinc-900/65 [&>a]:grid [&>a]:place-items-center [&>a]:transition-all [&>a]:rounded [&>a:hover]:bg-zinc-900/50 [&>a:active]:translate-y-px ">
      {social.map(({ id, icon, path }) => (
        <Link key={id} href={path} className="size-10" target="_blank">
          <Icon icon={icon} className="translate-y-px" />
        </Link>
      ))}
      {jobSeeking && resume && (
        <Link
          href={resume}
          target="_blank"
          className="h-10 !flex items-center px-4 w-fit gap-4"
        >
          Resume
          <Icon icon="download" />
        </Link>
      )}
    </div>
  );
}
