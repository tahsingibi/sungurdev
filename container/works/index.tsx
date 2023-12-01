import WorkCard from '@/components/custom/workcard'
import React from 'react'
import db from "@/db.json"

export default function Works() {

    const { heading, description } = db.pages.works;
    const { works } = db

    return (
        <>
            <h1>{heading}</h1>
            <p className="description">{description}</p>
            <hr className='mb-0' />

            <div className="grid gap-2 m-0 p-0">
                {works.map(work =>
                    <div id={work.name} key={work.id}>
                        <h2>{work.name}</h2>
                        <div dangerouslySetInnerHTML={{ __html: work.description }} />

                        <div className='grid gap-8 my-8'>
                            {work.projects.map(project => <WorkCard {...project} key={project.id} />)}
                        </div>
                    </div>)}
            </div>
        </>
    )
}
