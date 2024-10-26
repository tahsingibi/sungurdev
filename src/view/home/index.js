import React from 'react';
import About from './about';
import Social from './social';
import Experience from './experience';
import Work from './work';
import Hello from './hello';

export default function HomeView() {
  return (
    <>
      <div className="grid gap-8">
        <Hello />
        <About />
        <Social />
      </div>
      <Experience />
      <Work />
    </>
  );
}
