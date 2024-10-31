import db from '@/db';
import Avatar from '@/src/components/avatar';
import Social from '../social';

export default function About() {
  const { name, slug, hiring, about: _about } = db;
  const about = _about
    .replaceAll('{lastwork}', db.experience[0].name)
    .replaceAll('{lastworklink}', db.experience[0].path);

  return (
    <aside className="flex flex-col gap-4">
      <section className="flex gap-3 w-full relative z-10">
        <Avatar
          image="/img/profile.jpeg"
          className="size-12 sm:size-16 sm:!rounded-2xl overflow-hidden"
        />
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-2xl font-semibold lowercase">
            {name}
          </h2>
          <span className="text-zinc-500 inline-flex items-center relative">
            @{slug}
          </span>
        </div>

        {hiring && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2">
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-500 size-3 rounded-full before:absolute before:block before:size-3 before:bg-green-600 before:-z-10 before:inset-0 before:scale-x-105 before:rounded-full before:animate-ping  
    after:absolute after:block after:text-sm after:content-[attr(data-content)] after:whitespace-nowrap after:bg-green-700/20 after:border after:border-green-700/20 after:text-green-600 after:px-2 after:py-1 after:rounded after:origin-right after:scale-0 hover:after:scale-100 after:right-5  after:-translate-y-2.5 after:transition-all  after:duration-75"
              data-content="Open to work"
            ></span>
          </span>
        )}
      </section>
      <div className="flex flex-col gap-4">
        <div
          dangerouslySetInnerHTML={{ __html: about }}
          className="text-zinc-400 [&>.mark]:text-white [&>.mark]:font-medium [&>a]:text-white [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:decoration-wavy leading-loose"
        />
        <Social />
      </div>
    </aside>
  );
}
