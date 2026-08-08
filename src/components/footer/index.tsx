import settings from '@/src/settings';
import Link from 'next/link';
import { Icon } from '../icon';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-xs text-zinc-400 before:absolute before:left-1/2 before:top-0 before:h-px before:w-screen before:-translate-x-1/2 before:bg-zinc-800/80 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-zinc-800/80">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-y-4 px-6 py-10 font-mono sm:px-10">
        <span className="text-right text-zinc-400">Crafted by</span>
        <Link className="pl-5 text-zinc-300 hover:text-white" href="https://github.com/tahsingibi" target="_blank" rel="noopener noreferrer">
          @tahsingibi
        </Link>
        <span className="text-right text-zinc-400">Built with</span>
        <span className="pl-5 leading-6 text-zinc-400">Next.js · Tailwind CSS · MDX</span>
        <span className="text-right text-zinc-400">Source code</span>
        <Link className="pl-5 text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:decoration-zinc-300" href="https://github.com/tahsingibi/sungurdev" target="_blank" rel="noopener noreferrer">
          GitHub
        </Link>
        <span className="text-right text-zinc-400">Updated</span>
        <span className="pl-5 text-zinc-400">{year} · Izmir, TR</span>
      </div>

      <div className="relative flex h-12 items-stretch justify-center before:absolute before:left-1/2 before:top-0 before:h-px before:w-screen before:-translate-x-1/2 before:bg-zinc-800/80">
        {settings.social.map(({ id, icon, name, path }) => (
          <Link
            key={id}
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="grid w-12 place-items-center border-l border-zinc-800/80 text-zinc-600 last:border-r hover:bg-zinc-900 hover:text-zinc-200"
          >
            <Icon icon={icon} />
          </Link>
        ))}
      </div>
    </footer>
  );
}
