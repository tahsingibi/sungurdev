import Link from '@/src/components/active-link';

export default function Source({ link = '#' || [], className = '' }) {
  return (
    <div
      className={`bg-zinc-600/10 px-4 py-2 text-sm rounded-lg flex flex-col ${className}`}
    >
      <span className="title mb-2">Kaynak:</span>
      {link.map((item, i) => (
        <Link
          className="link font-mono text-zinc-500 hover:text-zinc-300 no-underline font-normal text-xs whitespace-pre-wrap text-wrap break-all"
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
