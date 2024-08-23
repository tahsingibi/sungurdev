import React from 'react'
import Links from '../links'
import db from '@/db.json'

export default function Header() {
    const { nav } = db;
    return (
        <header className="flex gap-4 py-4 sticky top-0  z-50 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 backdrop-blur-md mb-4 [&>a]:no-underline [&>a]:text-zinc-400 [&>a]:relative [&>a[data-active='true']]:!text-zinc-300">
            {nav.map(page => <Links href={page.path} scroll={false} key={page.id}>{page.name}</Links>)}
        </header>
    )
}
