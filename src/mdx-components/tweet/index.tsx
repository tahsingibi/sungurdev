'use client';
import dynamic from 'next/dynamic';

const X = dynamic(() => import('react-tweet').then((module) => module.Tweet), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-[30rem] place-items-center border border-zinc-800 font-mono text-xs text-zinc-400">
      Loading post…
    </div>
  ),
});

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
