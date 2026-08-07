import type { ComponentPropsWithoutRef } from 'react';

export default function InlineCode({ children }: ComponentPropsWithoutRef<'code'>) {
  return <code className="font-mono font-light text-zinc-400">{children}</code>;
}
