import Link from '@/src/components/active-link';

export default function Source({ link = '#' || [], className = '' }) {
  return (
    <div
      className={`bg-zinc-600/10 px-4 py-2 text-sm rounded-lg text-zinc-600 ${className}`}
    >
      <span className="title me-2">Kaynak:</span>
      {link.map((item, i) => (
        <span
          key={item}
          className={`element ${
            i > 0 ? 'before:content-["/"] before:mx-2' : ''
          }`}
        >
          <Link
            className="link text-zinc-500 hover:text-zinc-300"
            href={item}
            target="_blank"
          >
            {i + 1}
          </Link>
        </span>
      ))}
    </div>
  );
}
