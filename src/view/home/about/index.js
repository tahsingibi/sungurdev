import React from 'react';
import db from '@/db';

export default function About() {
  const about = db.about
    .replaceAll('{lastwork}', db.experience[0].name)
    .replaceAll('{lastworklink}', db.experience[0].path);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: about }}
      className="text-zinc-400 [&>.mark]:text-white [&>.mark]:font-medium [&>a]:text-white [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:decoration-wavy leading-loose"
    />
  );
}
