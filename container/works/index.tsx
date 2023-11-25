import WorkCard from '@/components/custom/workcard'
import React from 'react'
import { randomUUID } from 'crypto'


const content = {
    heading: "works",
    description: "summary of my background as a frontend developer.",
    mallconomy: {
        title: "Mallconomy",
        description: `Frontend Developer – 2022 Sep - 2023 Nov`,
        projects: [
            {
                id: randomUUID(),
                name: `Own a piece of Web3 Commerce's future`,
                path: "https://mint.mallconomy.com/",
                desc: "mint.mallconomy.com – Next.js, TypeScript",
                right: "2023"
            },
            {
                id: randomUUID(),
                name: `Malls of the Metaverse On Any Device`,
                path: "https://mallconomy.com/",
                desc: "mallconomy.com – HTML/SCSS/JS",
                right: "2023"
            },
            {
                id: randomUUID(),
                name: `MallStar App - Mallconomy`,
                path: "https://app.mallconomy.com/",
                desc: "app.mallconomy.com – Next.js",
                right: "2023"
            },
            {
                id: randomUUID(),
                name: `Hype&Buzz - Web3 Growth Partner`,
                path: "https://hypeand.buzz/",
                desc: "hypeand.buzz – Next.js",
                right: "2023"
            },
            {
                id: randomUUID(),
                name: `Admin Dashboard`,
                desc: "React, TypeScript",
                right: "2022"
            },
        ]
    },
    freelance: {
        title: "Freelance",
        description: `Sometime around 2010 or a bit earlier, I started developing using HTML/CSS and WordPress, which I continued as a side job until 2022. Regardless of my main occupation, I persisted in constantly improving my coding skills. In 2022, I decided to make coding my primary occupation and began enhancing my expertise in React/Next.js. Before venturing into a freelance frontend developer career, I delivered numerous WordPress products and released a couple of WordPress themes. Some of the projects I worked on during my freelance period include:`,
        projects: [
            {
                id: randomUUID(),
                name: 'sungur.dev | Developer Portfolio',
                path: "https://sungur.dev/",
                desc: "Next.js - TypeScript",
                right: "2023"
            },
            {
                id: randomUUID(),
                name: 'ToDo App.',
                path: "https://todoapp-practicum.vercel.app/",
                desc: "React - TailwindCSS",
                right: "2022"
            },
            {
                id: randomUUID(),
                name: 'Weather App.',
                path: "https://weatherapptr.vercel.app/",
                desc: "React - TailwindCSS",
                right: "2022"

            },
            {
                id: randomUUID(),
                name: 'tahsinbey.com blog page',
                path: "https://tahsinbey.com/",
                desc: "TailwindCSS - WordPress",
                right: "2022"
            },
            {
                id: randomUUID(),
                name: 'HEXWORD-TR',
                path: "https://hexword-tr.vercel.app/",
                desc: "React - TailwindCSS",
                right: "2022"
            },
            {
                id: randomUUID(),
                name: 'Landify Landing Page',
                path: "https://tahsinbey.com/cv/landify/",
                desc: "TailwindCSS",
                right: "2022"
            },
            {
                id: randomUUID(),
                name: 'BRN Architecture & Engineering',
                path: "https://tahsinbey.com/cv/brn/",
                desc: "TailwindCSS",
                right: "2022"
            },
            {
                id: randomUUID(),
                name: 'Pena Weddings Web Page',
                path: "https://tahsinbey.com/cv/penaweddings/",
                desc: "Bootstrap",
                right: "2021"
            },
        ]
    }
}

export default function Works() {

    const { heading, description } = content

    return (
        <>
            <h1>{heading}</h1>
            <p className="description">{description}</p>
            <hr className='mb-0' />

            <div className="grid gap-2 m-0 p-0">
                <div id="mallconomy">
                    <h2>{content.mallconomy.title}</h2>
                    <p>{content.mallconomy.description}</p>

                    <div className='grid gap-8 my-8'>
                        {content.mallconomy.projects.map(project => <WorkCard {...project} key={project.id} />)}
                    </div>
                </div>


                <div id="freelance">
                    <h2>{content.freelance.title}</h2>
                    <p>{content.freelance.description}</p>

                    <div className='grid gap-8 my-8'>
                        {content.freelance.projects.map(project => <WorkCard {...project} key={project.id} />)}
                    </div>
                </div>
            </div>
        </>
    )
}
