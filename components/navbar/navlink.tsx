"use client";
import React, { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import isActivePage from '@/utils/isActivePage';

export default function NavLink({ href, children, className, ...props }: { href: string, children: ReactNode, className: any }) {

  return (
    <Link href={href} key={href} data-active={isActivePage(href)} className={...className} {...props}>
      {children}
    </Link>
  );
}
