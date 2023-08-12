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
    const isActive = () => {
        let state = false;
        if (href == '/blog' && pathname.includes(href)) {
            state = true
        } else if (pathname.endsWith(href)) {
            state = true
        }
        return state;
    };

    return <Link href={href} target={target} className={clsx([isActive() ? 'active' : '', ...customClass])}>{children}</Link>
}
