'use client';
import NextLink, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';

type ActiveLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof LinkProps>;

export default function Link({ children, prefetch = false, ...props }: ActiveLinkProps) {
  const path = usePathname();
  const { href = '' } = props;
  const isActive =
    href === '/'
      ? path === href
      : path === href || path.startsWith(`${href}/`);
  return (
    <NextLink prefetch={prefetch} {...props} data-active={isActive}>
      {children}
    </NextLink>
  );
}
