import Avatar from '@/src/components/avatar';
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
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Career / Selected work</span>
        <h1 className="text-4xl font-medium tracking-[-0.04em] text-foreground">{heading}</h1>
        <p className="max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
      </header>
      <SectionSeparator />
      {experience.map((work, index) => (
        <Fragment key={work.id}>
          <section id={work.name} className="flex flex-col gap-3 px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-medium tracking-tight text-foreground">
                {work.name}
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground">{work.year}</span>
            </div>
            <div
              className="prose max-w-full text-sm leading-7 text-muted-foreground dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: work.description }}
            />

            <div className="my-5 grid empty:hidden">
              {work?.projects?.map(
                ({ id, name, image, live, repo, year, tech, icon }) => {
                  const path = live || repo || '#';
                  return (
                    <Link
                      key={id}
                      className="group relative flex items-center gap-4 p-4 transition-colors hover:bg-accent/60 active:translate-y-px"
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
