"use client";
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { clsx } from '@/utils';
import { usePathname } from 'next/navigation'

interface SidebarType {
    children: ReactNode;
    href: string;
    target?: string;
    customClass?: Array<string>;
}

export function Links({ children, href, target = '', customClass = [] }: SidebarType) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return <Link href={href} target={target} className={clsx([isActive ? 'active' : '', ...customClass])}>{children}</Link>
}
