import React from 'react';
import Link from 'next/link';
import db from '@/db';
import { Icon } from '@/src/components/icon';
import Avatar from '@/src/components/avatar';

export default function ExperienceView() {
  const { heading, description } = db.pages.works;
  const { experience } = db;
  return (
    <>
      <div className="flex flex-col leading-loose gap-2">
        <h2 className="text-4xl text-white">{heading}</h2>
        <p>{description}</p>
      </div>
      <div className="flex flex-col">
        {experience.map((work) => (
          <div
            id={work.name}
            key={work.id}
            className="flex flex-col gap-2 border-b border-zinc-800 pb-8 mb-8 last:pb-0 last:mb-0 last:border-none"
          >
            <div className="flex flex-col gap-0">
              <h2 className="text-2xl leading-loose font-medium">
                {work.name}
              </h2>
              <span className="text-sm font-mono opacity-60">{work.year}</span>
            </div>
            <div
              className="leading-loose text-zinc-400 prose"
              dangerouslySetInnerHTML={{ __html: work.description }}
            />

            <div className="grid gap-1 my-8 empty:hidden">
              {work?.projects?.map(
                ({ id, name, image, live, repo, year, tech, icon }) => {
                  const path = live || repo || '#';
                  return (
                    <Link
                      key={id}
                      className="flex items-center gap-4 active:translate-y-px transition-all relative group p-4 hover:bg-zinc-900/40 "
                      href={path}
                      target="_blank"
                    >
                      <Avatar
                        image={image}
                        text={name}
                        icon={icon}
                        name={work.name}
                      />
                      <p className="flex flex-col gap-1 text-pretty pr-12">
                        <span className="line-clamp-1">{name}</span>
                        <span className="text-sm opacity-60">
                          <span className="font-mono">{year}</span>
                          {' – '}
                          {tech}
                        </span>
                      </p>
                      <Icon
                        icon="arrow-right-short"
                        className="absolute scale-125 top-1/2 right-4 -translate-y-1/2 text-2xl leading-none inline-flex opacity-0 group-hover:opacity-100 transition-all duration-150"
                      />
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
