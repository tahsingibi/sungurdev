"use client";
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'
import clsx from '@/src/lib/clsx';

interface SidebarType {
    children: ReactNode;
    href: string;
    target?: string;
    customClass?: Array<string>;
}

export function SidebarLink({ children, href, target = '', customClass = [] }: SidebarType) {
    const pathname = usePathname();

    return <Link href={href} target={target} className={clsx([pathname.endsWith(href) ? 'active' : '', ...customClass])}>{children}</Link>
}
