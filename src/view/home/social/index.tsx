import { Icon } from '@/src/components/icon';
import db from '@/src/settings';
import Link from 'next/link';

export default function Social() {
  const { social, resume, hiring } = db;
  return (
    <div className="flex flex-wrap items-center gap-1 text-zinc-400 [&>a]:grid [&>a]:shrink-0 [&>a]:place-items-center [&>a]:border [&>a]:border-transparent [&>a]:transition-all [&>a:hover]:border-zinc-800 [&>a:hover]:bg-zinc-900/50 [&>a:active]:translate-y-px">
      {social.map(({ id, icon, name, path }) => (
        <Link key={id} href={path} className="size-10" target="_blank" aria-label={name}>
          <Icon icon={icon} />
        </Link>
      ))}
      {hiring && resume && (
        <Link
          href={resume}
          target="_blank"
          className="h-10 flex! items-center px-4 w-fit gap-4"
        >
          Resume
          <Icon icon="download" />
        </Link>
      )}
    </div>
  );
}
