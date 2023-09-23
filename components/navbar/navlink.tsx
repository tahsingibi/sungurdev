"use client"
import React, { ReactNode, memo } from 'react';
import Link from 'next/link';
import isActivePage from '@/utils/isActivePage';

 function NavLink({ href, children, className, targetSegment, scroll, ...props }: { href: string, targetSegment?: null | string, scroll: boolean, children?: ReactNode, className?: any }) {

  return (
    <Link href={href} key={href} data-active={isActivePage(href, targetSegment)} className={...className} {...props} scroll={scroll}>
      {children}
    </Link>
  );
}

export default memo(NavLink)