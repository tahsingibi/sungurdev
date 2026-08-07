import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

function HeadingBase({ children, className = '', ...props }: ComponentPropsWithoutRef<'h4'>) {
  return (
    <h4 className={`text-lg relative ${className}`} {...props}>
      {children}
    </h4>
  );
}

function HeadingLink({ children, className = '', ...props }: ComponentPropsWithoutRef<typeof NextLink>) {
  return (
    <NextLink
      className={`ml-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors ${className}`}
      {...props}
    >
      {children}
    </NextLink>
  );
}

const Heading = Object.assign(HeadingBase, { Link: HeadingLink });

export default Heading;
export { HeadingLink as Link };
