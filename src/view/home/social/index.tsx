import { Icon } from '@/src/components/icon';
import db from '@/src/settings';
import Link from 'next/link';

export default function Social() {
  const { social, resume, hiring } = db;
  return (
    <div className="flex min-h-11 overflow-x-auto border-y border-foreground/10 text-muted-foreground">
      {social.map(({ id, icon, name, path }) => (
        <Link
          key={id}
          href={path}
          className="grid w-11 shrink-0 place-items-center border-r border-foreground/10 transition-colors hover:bg-accent/70 hover:text-foreground active:translate-y-px"
          target="_blank"
          aria-label={name}
        >
          <Icon icon={icon} />
        </Link>
      ))}
      {hiring && resume && (
        <Link
          href={resume}
          target="_blank"
          className="ml-auto flex! min-h-11 shrink-0 items-center gap-3 border-l border-foreground/10 px-4 font-mono text-[11px] transition-colors hover:bg-accent/70 hover:text-foreground"
        >
          Resume
          <Icon icon="download" />
        </Link>
      )}
    </div>
  );
}
