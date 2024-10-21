import React from 'react';
import Image from 'next/image';
import db from '@/db';
import Link from '@/src/components/active-link';
import Heading from '../block-heading';
import { Icon } from '@/src/components/icon';

export default function Experience() {
  const { experience } = db;

  return (
    <div className="grid gap-8">
      <Heading id="experiences">experiences</Heading>
      <div className="grid gap-1">
        {experience.map(({ id, image, name, title, year, path }) => (
          <Link
            href={path}
            key={id}
            className="flex items-center gap-6 flex-wrap relative active:translate-y-px group hover:bg-zinc-900/40 p-4 rounded-lg"
          >
            <Image
              src={image}
              width={200}
              height={200}
              className="size-8 object-contain"
              alt={title}
            />
            <div className="flex flex-col grow">
              <p className="font-medium">
                {name}
                <Icon
                  icon="arrow-up-short"
                  className="text-2xl inline-block rotate-45 -translate-y-0.5 translate-x-3 leading-none opacity-0 group-hover:opacity-100 transition-all duration-150 size-0"
                />
              </p>
              <p className="opacity-60 flex max-sm:flex-col justify-between w-full text-sm">
                <span>{title}</span>
                <span>{year}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
