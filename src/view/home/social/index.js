import db from '@/db';
import { Icon } from '@/src/components/icon';
import Link from 'next/link';

export default function Social() {
  const { social, resume, hiring } = db;
  return (
    <div className="flex items-center gap-1 flex-wrap  [&>a]:shrink-0  [&>a]:grid [&>a]:place-items-center [&>a]:transition-all [&>a]:rounded [&>a:hover]:bg-zinc-900/50 [&>a:active]:translate-y-px text-zinc-400">
      {social.map(({ id, icon, path }) => (
        <Link key={id} href={path} className="size-10" target="_blank">
          <Icon icon={icon} className="translate-y-px" />
        </Link>
      ))}
      {hiring && resume && (
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
