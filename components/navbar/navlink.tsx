"use client";
import React, { ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function NavLink({ href, icon, name }: { href: string, icon: ReactElement, name: string }) {

  const params = usePathname();
  const isActive = (href: string) => params == href

  return (
    <Link href={href} key={href} data-active={isActive(href)}>
      {icon}
      {name}
    </Link>
  );
}
