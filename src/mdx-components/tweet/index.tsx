'use client';
import { Tweet as X } from 'react-tweet';

interface TweetProps {
  id: string;
  className?: string;
}

export default function Tweet({ id, className = '' }: TweetProps) {
  return (
    <div className={`[&>.react-tweet-theme]:max-w-full ${className}`}>
      <X id={id} />
    </div>
  );
}
