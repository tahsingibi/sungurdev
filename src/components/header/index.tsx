import settings from '@/src/settings';
import Link from '../active-link';

export default function Header() {
  const { nav } = settings;
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-zinc-950/90 px-4 backdrop-blur-md after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-zinc-800/80 sm:px-6">
      <Link
        href="/"
        aria-label="TS/01"
        className="font-mono text-xs font-medium tracking-[0.18em] text-zinc-300"
      >
        TS<span className="text-zinc-400">/01</span>
      </Link>
      <nav aria-label="Ana navigasyon" className="flex h-full items-center gap-1">
        {nav.map(({ id, name, path }) => (
          <Link
            key={id}
            href={path}
            className="relative flex h-full items-center px-3 text-xs capitalize text-zinc-400 hover:text-zinc-200 data-[active='true']:text-white after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-white after:transition-transform data-[active='true']:after:origin-left data-[active='true']:after:scale-x-100"
            data-disabled={path.startsWith('#')}
          >
            {name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
