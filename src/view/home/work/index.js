import React from 'react';
import db from '@/db';
import Link from 'next/link';
import Heading from '../block-heading';
import { Icon } from '@/src/components/icon';

export default function Work() {
  const { experience } = db;

  const work = experience
    .find((exp) => exp.name === 'Freelance')
    .projects.slice(0, 6);

  return (
    <div className="grid gap-8">
      <Heading id="works">works</Heading>
      <div className="grid sm:grid-cols-2 gap-2">
        {work.map(({ id, name, explain, tech, repo, live, icon = 'code' }) => (
          <div
            key={id}
            className="flex sm:flex-col sm:justify-between gap-6 border border-zinc-900 p-4 rounded-lg group transition-all overflow-hidden relative"
          >
            <Icon icon={icon} className="text-3xl " />
            <div className="grid mt-auto gap-4 sm:translate-y-8 group-hover:translate-y-0 transition-all duration-300 pr-8">
              <div className="grid gap-1">
                <h6 className="font-medium text-lg">{name}</h6>
                <p className="text-sm text-zinc-400">{explain}</p>
              </div>
              <div className="sm:translate-y-12 group-hover:translate-y-0 group-hover:h-fit transition-all duration-500 flex gap-2 [&>a]:font-mono [&>a:active]:translate-y-px [&>a]:uppercase text-xs [&>a:hover]:opacity-60">
                {repo && (
                  <Link href={repo} target="_blank">
                    Github
                  </Link>
                )}
                {live && (
                  <Link href={live} target="_blank">
                    live
                  </Link>
                )}
              </div>
            </div>
            <div className="absolute size-96 -bottom-40 right-0 translate-x-[125%] group-hover:translate-x-[75%] bg-gradient-to-br from-zinc-800/20 rounded-full -z-[1] transition-all duration-500 opacity-70" />
            <div className="absolute size-96 -bottom-40 right-0 translate-x-[125%] group-hover:translate-x-[75%] bg-zinc-900/80 rounded-full scale-110 -z-[2] transition-all duration-150 opacity-70" />
            <Icon
              icon="arrow-right"
              className="absolute bottom-2 right-8 text-2xl translate-x-96 group-hover:translate-x-0 transition-all duration-500 "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
