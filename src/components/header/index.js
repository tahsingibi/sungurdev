import db from '@/db';
import Link from '../active-link';

export default function Header() {
  const { nav } = db;
  return (
    <div className="flex flex-col gap-6 mt-8 w-full inset-0 ">
      <nav className="flex gap-4 w-full ">
        {nav.map(({ id, name, path }) => (
          <Link
            key={id}
            href={path}
            className="flex items-center gap-2  text-zinc-500 data-[disabled='true']:text-zinc-700 data-[disabled='true']:pointer-events-none data-[active='true']:text-white  underline-offset-4 data-[active='true']:underline"
            data-disabled={path.startsWith('#')}
          >
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
