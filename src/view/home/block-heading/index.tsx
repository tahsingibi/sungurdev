import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

function HeadingBase({ children, className = '', ...props }: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2 className={`relative flex min-h-14 items-center px-6 font-mono text-xs uppercase tracking-[0.16em] text-foreground before:absolute before:left-1/2 before:top-0 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-border sm:px-10 ${className}`} {...props}>
      {children}
    </h2>
  );
}

function HeadingLink({ children, className = '', ...props }: ComponentPropsWithoutRef<typeof NextLink>) {
  return (
    <NextLink
      className={`ml-auto text-[10px] normal-case tracking-normal text-muted-foreground transition-colors hover:text-foreground ${className}`}
      {...props}
    >
      {children}
    </NextLink>
  );
}

const Heading = Object.assign(HeadingBase, { Link: HeadingLink });

export default Heading;
export { HeadingLink as Link };
