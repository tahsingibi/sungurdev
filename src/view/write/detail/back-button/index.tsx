import Link from '@/src/components/active-link';
import { Icon } from '@/src/components/icon';

export default function BackButton() {
  return (
    <Link
      href="/write"
      className="group flex h-8 items-center gap-2 font-mono text-xs text-zinc-400 hover:text-zinc-100"
    >
      <Icon icon="arrow-left-line" />
      Blog
    </Link>
  );
}
