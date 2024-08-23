import React from 'react'
import Image from 'next/image'
import db from '@/db.json'


export default function ProfileCard() {
    return (
        <div className="flex gap-4 items-center relative">
            <figure className="w-16 h-16 aspect-square overflow-hidden rounded-xl m-0">
                <Image className='w-20 h-20  object-cover' src={db.image} alt={db.name} width={200} height={200} />
            </figure>
            <div className="flex flex-col gap-0 ">
                <h3 className='m-0'>{db.name}</h3>
                <p className='m-0'>{db.title}</p>
            </div>
            {db.jobSeeking && <p className="absolute right-3 bg-green-500 w-3 h-3 rounded-full
    before:absolute before:block before:w-3 before:h-3 before:bg-green-600 before:-z-10 before:inset-0 before:scale-x-105 before:rounded-full before:animate-ping
    
    after:absolute after:block after:text-sm after:content-[attr(data-content)] after:whitespace-nowrap after:bg-zinc-900 after:px-2 after:py-1 after:rounded after:origin-right after:scale-0 hover:after:scale-100 after:right-full after:-translate-x-4 after:-top-1/2 after:transition-all after:duration-75;" data-content="Open to work"></p>}
        </div>
    )
}
