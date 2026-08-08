import settings from '@/src/settings';
import Link from 'next/link';
import { Icon } from '../icon';
import ThemeToggle from '../theme-toggle';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-xs text-muted-foreground before:absolute before:left-1/2 before:top-0 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-border">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-y-4 px-6 py-10 font-mono sm:px-10">
        <span className="text-right text-muted-foreground">Crafted by</span>
        <Link className="pl-5 text-foreground hover:underline" href="https://github.com/tahsingibi" target="_blank" rel="noopener noreferrer">
          @tahsingibi
        </Link>
        <span className="text-right text-muted-foreground">Built with</span>
        <span className="pl-5 text-muted-foreground">Next.js · Tailwind CSS · MDX</span>
        <span className="text-right text-muted-foreground">Source code</span>
        <Link className="pl-5 text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground" href="https://github.com/tahsingibi/sungurdev" target="_blank" rel="noopener noreferrer">
          GitHub
        </Link>
        <span className="text-right text-muted-foreground">Updated</span>
        <span className="pl-5 text-muted-foreground">{year} · Izmir, TR</span>
      </div>

      <div className="relative flex h-12 items-stretch justify-center before:absolute before:left-1/2 before:top-0 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border">
        {settings.social.map(({ id, icon, name, path }) => (
          <Link
            key={id}
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="grid w-12 place-items-center border-l border-border text-muted-foreground last:border-r hover:bg-accent hover:text-foreground"
          >
            <Icon icon={icon} />
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </footer>
  );
}
