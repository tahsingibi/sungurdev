'use client';
import { Tweet as X } from 'react-tweet';

export default function Tweet({ id, className = '' }) {
  return (
    <div className={`[&>.react-tweet-theme]:max-w-full ${className}`}>
      <X id={id} />
    </div>
  );
}
