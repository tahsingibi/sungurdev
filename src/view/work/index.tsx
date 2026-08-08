import Avatar from '@/src/components/avatar';
import { Icon } from '@/src/components/icon';
import db from '@/src/settings';
import Link from 'next/link';
import SectionSeparator from '@/src/components/section-separator';
import { Fragment } from 'react';

export default function ExperienceView() {
  const { heading, description } = db.pages.works;
  const { experience } = db;
  return (
    <div className="flex flex-col">
      <header className="flex flex-col gap-3 px-6 py-12 sm:px-10 sm:py-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">Career / Selected work</span>
        <h1 className="text-4xl font-medium tracking-[-0.04em] text-white">{heading}</h1>
        <p className="max-w-lg text-sm leading-6 text-zinc-400">{description}</p>
      </header>
      <SectionSeparator />
      {experience.map((work, index) => (
        <Fragment key={work.id}>
          <section id={work.name} className="flex flex-col gap-3 px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-medium tracking-tight text-zinc-100">
                {work.name}
              </h2>
              <span className="font-mono text-[10px] text-zinc-400">{work.year}</span>
            </div>
            <div
              className="prose prose-zinc max-w-full text-sm leading-7 text-zinc-400"
              dangerouslySetInnerHTML={{ __html: work.description }}
            />

            <div className="my-5 grid empty:hidden">
              {work?.projects?.map(
                ({ id, name, image, live, repo, year, tech, icon }) => {
                  const path = live || repo || '#';
                  return (
                    <Link
                      key={id}
                      className="group relative flex items-center gap-4 p-4 transition-colors hover:bg-zinc-900/50 active:translate-y-px"
                      href={path}
                      target="_blank"
                    >
                      <Avatar
                        image={image}
                        text={name}
                        icon={icon}
                        name={work.name}
                        className="size-8 bg-transparent!"
                      />
                      <p className="flex flex-col gap-1 text-pretty pr-12">
                        <span className="line-clamp-1">{name}</span>
                        <span className="text-sm opacity-60">
                          <span className="font-mono">{year}</span>
                          {' – '}
                          {tech}
                        </span>
                      </p>

                      <span className="absolute right-0 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 inline-block group-hover:opacity-100 transition-all duration-150 ease-hover">
                        <Icon
                          icon="arrow-up-short"
                          className="text-2xl inline-block rotate-90 -translate-y-0.5 scale-0 group-hover:scale-125 group-hover:-translate-x-2 leading-none size-0 "
                        />
                      </span>
                    </Link>
                  );
                }
              )}
            </div>
          </section>
          {index < experience.length - 1 && <SectionSeparator />}
        </Fragment>
      ))}
      <SectionSeparator />
    </div>
  );
}
