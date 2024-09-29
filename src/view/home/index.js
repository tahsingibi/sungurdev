import React from 'react';
import ProfileCard from './profile-card';
import About from './about';
import Social from './social';
import Experience from './experience';
import Work from './work';

export default function HomeView() {
  return (
    <>
      <div className="grid gap-8">
        <ProfileCard />
        <About />
        <Social />
      </div>
      <Experience />
      <Work />
    </>
  );
}
