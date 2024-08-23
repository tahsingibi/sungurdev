import React from 'react'
import WorkCard from '@/components/custom/workcard'
import db from '@/db.json'

const content = { title: "works" }

export default function Works() {

    return (
        <div>
            <h4 className='mb-4'>{content.title}</h4>
            <div className="grid gap-8">
                {db.works.map(co => <WorkCard {...co} key={co.id} />)}
            </div>
        </div>
    )
}
