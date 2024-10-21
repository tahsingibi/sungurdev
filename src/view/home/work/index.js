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
      <div className="grid gap-1">
        {work.map(({ id, name, explain, repo, live, icon = 'code' }) => (
          <div
            key={id}
            className="flex max-sm:flex-col max-sm:gap-4 sm:justify-between hover:bg-zinc-900/40 p-4 rounded-lg group transition-all overflow-hidden relative"
          >
            <div className="flex sm:justify-between gap-6 overflow-hidden relative">
              <Icon icon={icon} className="text-3xl" />
              <div className="grid mt-auto gap-4  transition-all duration-300 pr-8">
                <div className="grid ">
                  <Link
                    href={live || repo || '#'}
                    className="font-medium text-lg"
                    target="_blank"
                  >
                    {name}
                    <Icon
                      icon="arrow-up-short"
                      className="text-2xl inline-block rotate-45 -translate-y-0.5 translate-x-3 leading-none opacity-0 group-hover:opacity-100 transition-all duration-150 size-0"
                    />
                  </Link>
                  <p className="text-sm opacity-60">{explain}</p>
                </div>
              </div>
            </div>
            <div className="transition-all duration-500 flex gap-2 [&>a]:font-mono [&>a:active]:translate-y-px [&>a]:uppercase text-xs [&>a:hover]:opacity-60 sm:ml-auto sm:mt-auto max-sm:w-full max-sm:pl-14">
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
        ))}
      </div>
    </div>
  );
}
