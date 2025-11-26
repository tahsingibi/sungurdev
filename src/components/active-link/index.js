'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import * as NextLink from 'next/link';

export default function Link({ children, prefetch = false, ...props }) {
  const path = usePathname();
  const { href = '' } = props;
  const isActive = path === href;
  return (
    <NextLink prefetch={prefetch} {...props} data-active={isActive}>
      {children}
    </NextLink>
  );
}
