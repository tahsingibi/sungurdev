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
      <div className="grid gap-6">
        {experience.map(({ id, image, name, title, year, path }) => (
          <Link
            href={path}
            key={id}
            className="flex items-center gap-6 flex-wrap relative before:rounded before:w-full before:h-full before:absolute before:inset-0 before:scale-x-105 before:scale-y-150 first:hover:before:bg-yellow-300/5  [&:nth-child(2)]:hover:before:bg-red-400/5 hover:before:bg-white/5 transition-all before:transition-all before:duration-150 active:translate-y-px group"
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
                {name}{' '}
                <Icon
                  icon="arrow-up-short"
                  className="text-2xl leading-none inline-flex rotate-45 translate-y-1.5 opacity-0 group-hover:opacity-100 transition-all duration-150"
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
