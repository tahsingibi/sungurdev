import React from 'react';
import db from '@/db';

export default function Hello() {
  const { name } = db;
  return (
    <div className="text-3xl text-wrap">
      Hi, i&apos;m <span className="font-medium text-white">{name}</span>
    </div>
  );
}
