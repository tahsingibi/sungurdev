'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import * as NextLink from 'next/link';

export default function Link({ children, ...props }) {
  const path = usePathname();
  const { href = '' } = props;
  const isActive = path === href;
  return (
    <NextLink {...props} data-active={isActive}>
      {children}
    </NextLink>
  );
}
