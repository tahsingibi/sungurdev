import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/db';
import { Icon } from '@/src/components/icon';

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
            className="flex flex-col gap-2 border-b border-zinc-800 pb-8 mb-8 last:pb-0 last:mb-0"
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

            <div className="grid gap-8 my-8 empty:hidden">
              {work?.projects?.map(
                ({ id, name, image, live, repo, title, year, tech, icon }) => {
                  const path = live || repo || '#';
                  return (
                    <Link
                      key={id}
                      className="flex items-center gap-4 active:translate-y-px transition-all relative before:transition-all before:absolute before:-z-10 before:left-1/2 before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:size-full hover:before:bg-zinc-900/50 before:scale-y-125 before:scale-x-[1.025] before:rounded-lg group"
                      href={path}
                      target="_blank"
                    >
                      <Avatar image={image} text={name} icon={icon} />
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

function Avatar({ image, text, icon }) {
  return (
    <figure className="relative size-12 bg-zinc-800/60 rounded-lg shrink-0 flex items-center justify-center has-[img]:bg-transparent">
      {image && (
        <Image
          src={image}
          fill
          className="object-cover select-none pointer-events-none"
        />
      )}
      {icon && <Icon icon={icon} className="text-xl" />}
      {!image && !icon && (
        <span className="select-none pointer-events-none">
          {text?.slice(0, 2)}
        </span>
      )}
    </figure>
  );
}
