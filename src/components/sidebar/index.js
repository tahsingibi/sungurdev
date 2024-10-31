import db from '@/db';
import Link from '../active-link';
import Avatar from '../avatar';
import { Icon } from '../icon';

export default function Sidebar() {
  const { slug, name, nav, hiring } = db;
  return (
    <div
      className="sm:col-span-4 flex sm:flex-col gap-6 fixed w-full inset-0 max-sm:p-4 sm:sticky top-0 sm:top-10 h-fit max-sm:flex-wrap z-50 max-sm:max-h-20 max-sm:has-[input:checked]:max-h-screen overflow-hidden
     max-sm:peer-checked:opacity-100 max-sm:peer-checked:clip-path-[inset(0_0_0_0)] transition-[transform,max-height,opacity] duration-1000 ease-[cubic-bezier(2,_0.1,_2,_0.1)] transform origin-top max-sm:bg-zinc-950/50 max-sm:backdrop-blur"
    >
      <input type="checkbox" className="sr-only peer" id="menu" />
      <div className="flex sm:flex-col gap-3 max-sm:w-fit relative z-10 sm:pl-3">
        <Link href="/" className="w-fit " data-hiring={hiring}>
          <Avatar
            image="/img/profile.jpeg"
            className="size-12 sm:size-16 sm:!rounded-2xl overflow-hidden"
          />
        </Link>
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-2xl font-semibold lowercase">
            {name}
          </h2>
          <span className="text-zinc-500 inline-flex items-center relative">
            @{slug}
            {hiring && (
              <span className="relative">
                <span
                  className="absolute -right-4 top-1/2 -translate-y-1/2 bg-green-500 size-2 rounded-full before:absolute before:block before:size-2 before:bg-green-600 before:-z-10 before:inset-0 before:scale-x-105 before:rounded-full before:animate-ping  
    after:absolute after:block after:text-xs after:content-[attr(data-content)] after:whitespace-nowrap after:bg-green-700/20 after:border after:border-green-700/20 after:text-green-600 after:px-1 after:py-0.5 after:rounded after:origin-left after:scale-0 hover:after:scale-100 after:left-full after:translate-x-2 after:-top-1/2  after:-translate-y-1 after:transition-all  after:duration-75"
                  data-content="Open to work"
                ></span>
              </span>
            )}
          </span>
        </div>
      </div>

      <label
        className="ml-auto bg-white/5 size-12 rounded-lg flex items-center justify-center sm:hidden z-10"
        htmlFor="menu"
      >
        <Icon icon="list" className="text-white text-lg" />
      </label>
      <nav className="flex flex-col gap-1 w-full max-sm:pointer-events-none max-sm:peer-checked:pointer-events-auto max-sm:opacity-0 max-sm:scale-y-0 max-sm:peer-checked:scale-y-100 max-sm:peer-checked:opacity-100 z-10 transition-[transform,opacity]  ease-[cubic-bezier(0.4,_0,_0.2,_1)] origin-top duration-1000">
        {nav.map(({ id, name, path, icon }) => (
          <Link
            key={id}
            href={path}
            className="flex items-center gap-2 px-3 py-2 text-zinc-500 hover:bg-white/5 rounded-lg data-[disabled='true']:text-zinc-700 data-[disabled='true']:hover:bg-transparent data-[disabled='true']:pointer-events-none data-[active='true']:text-white "
            data-disabled={path.startsWith('#')}
          >
            <Icon icon={icon} />
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
