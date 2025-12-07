'use client';
import * as NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export default function Link({ children, prefetch = false, ...props }) {
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
