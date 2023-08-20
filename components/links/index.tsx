"use client";
import { ReactNode } from "react"
import Link from "next/link"
import { clsx } from "@/utils"
import { usePathname } from 'next/navigation'
import styles from './links.module.scss'

interface LinkType {
    children: ReactNode;
    href: string;
    target?: string;
    customClass?: Array<string>;
}


export function Links({ children, href, target = '', customClass = [] }: LinkType) {
    const pathname = usePathname()

    let isActive = false
    if (pathname?.length > 0) {
        const splittedPathname = pathname.split('/')
        const currentPathname = splittedPathname[1] ?? ''
        isActive = currentPathname === href.split('/')[1]
    }


    return (
        <Link href={href} target={target} className={clsx([styles.link, isActive ? 'active' : '', ...customClass])}>{children}</Link>
    )
}
