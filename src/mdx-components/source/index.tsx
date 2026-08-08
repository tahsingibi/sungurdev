import Link from '@/src/components/active-link';

interface SourceProps {
  link?: string[];
  className?: string;
}

export default function Source({ link = [], className = '' }: SourceProps) {
  return (
    <div
      className={`flex flex-col border border-border bg-muted/50 px-4 py-3 text-sm ${className}`}
    >
      <span className="title mb-2">Kaynak:</span>
      {link.map((item, i) => (
        <Link
          className="link whitespace-pre-wrap text-wrap break-all font-mono text-xs font-normal text-muted-foreground no-underline hover:text-foreground"
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
