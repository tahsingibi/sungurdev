import settings from '@/src/settings';
import Link from '../active-link';

export default function Header() {
  const { nav } = settings;
  return (
    <div className="flex flex-col gap-6 mt-8 w-full inset-0 ">
      <nav className="flex gap-4 w-full ">
        {nav.map(({ id, name, path }) => (
          <Link
            key={id}
            href={path}
            className="flex items-center gap-2  text-zinc-500 data-[disabled='true']:text-zinc-700 data-[disabled='true']:pointer-events-none data-[active='true']:text-white underline-offset-4 data-[active='true']:underline work-link w-fit relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-500 after:ease-hover hover:after:right-auto hover:after:left-0 hover:after:w-full"
            data-disabled={path.startsWith('#')}
          >
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
