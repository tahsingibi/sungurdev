import Link from '@/src/components/active-link';

interface SourceProps {
  link?: string[];
  className?: string;
}

export default function Source({ link = [], className = '' }: SourceProps) {
  return (
    <div
      className={`bg-zinc-600/10 px-4 py-2 text-sm rounded-lg flex flex-col ${className}`}
    >
      <span className="title mb-2">Kaynak:</span>
      {link.map((item, i) => (
        <Link
          className="link whitespace-pre-wrap text-wrap break-all font-mono text-xs font-normal text-zinc-400 no-underline hover:text-zinc-300"
          href={item}
          target="_blank"
          key={i}
        >
          <span>{i + 1} - </span>
          {item}
        </Link>
      ))}
    </div>
  );
}
