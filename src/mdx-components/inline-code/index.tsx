import type { ComponentPropsWithoutRef } from 'react';

export default function InlineCode({ children }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code className="border border-border bg-muted px-1 py-0.5 font-mono text-[0.875em] font-normal text-foreground">
      {children}
    </code>
  );
}
