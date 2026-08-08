import Avatar from '@/src/components/avatar';
import settings from '@/src/settings';
import Social from '../social';

export default function About() {
  const { name, slug, hiring, about: _about } = settings;
  const about = _about
    .replaceAll('{lastwork}', settings.experience[0].name)
    .replaceAll('{lastworklink}', settings.experience[0].path);

  return (
    <section aria-labelledby="profile-heading">
      <div className="relative h-56 overflow-hidden border-b border-zinc-800/80 bg-[linear-gradient(rgb(39_39_42/0.28)_1px,transparent_1px),linear-gradient(90deg,rgb(39_39_42/0.28)_1px,transparent_1px)] bg-[size:56px_56px] sm:h-72">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rotate-[30deg] border border-zinc-700/60 sm:size-44">
          <div className="absolute -inset-7 border border-zinc-800/70" />
          <div className="absolute inset-7 border border-zinc-700/60" />
          <div className="absolute -left-24 top-20 h-12 w-20 border border-zinc-800/80" />
        </div>
        <span className="absolute bottom-4 right-5 font-mono text-[9px] tracking-[0.22em] text-zinc-700">FIG_001</span>
      </div>

      <div className="relative flex flex-col gap-5 px-6 pb-8 sm:px-10">
        <div className="-mt-12 flex items-end gap-5 sm:-mt-16">
          <Avatar
            image="/img/profile.jpeg"
            name={name}
            priority
            className="size-24 overflow-hidden rounded-full ring-4 ring-zinc-950 sm:size-32"
          />
          <div className="min-w-0 pb-2">
            <h1 id="profile-heading" className="truncate text-3xl font-medium tracking-[-0.04em] text-zinc-100 sm:text-4xl">{name}</h1>
            <p className="mt-1 font-mono text-[11px] text-zinc-400">Creating with code. Small details matter.</p>
          </div>
        </div>

        <div className="grid gap-px border-y border-zinc-800/80 bg-zinc-800/80 font-mono text-xs sm:grid-cols-2">
          <div className="flex items-center gap-3 bg-zinc-950 px-4 py-3 text-zinc-400">
            <span className="text-zinc-400">01</span>{settings.title}
          </div>
          <div className="flex items-center gap-3 bg-zinc-950 px-4 py-3 text-zinc-400">
            <span className="text-zinc-400">02</span>Izmir, Türkiye
          </div>
          <div className="flex items-center gap-3 bg-zinc-950 px-4 py-3 text-zinc-400">
            <span className="text-zinc-400">03</span>@{slug}
          </div>
          <div className="flex items-center gap-3 bg-zinc-950 px-4 py-3 text-zinc-400">
            <span className="text-zinc-400">04</span>
            {hiring ? 'Available for selected work' : 'Currently unavailable'}
          </div>
        </div>

        <Social />
      </div>

      <div className="relative px-6 py-10 before:absolute before:left-1/2 before:top-0 before:h-px before:w-screen before:-translate-x-1/2 before:bg-zinc-800/80 sm:px-10">
        <p className="mb-5 font-mono text-sm italic text-zinc-200">Good morning</p>
        <div
          dangerouslySetInnerHTML={{ __html: about }}
          className="text-pretty text-base leading-7 text-zinc-400 [&>.mark]:font-medium [&>.mark]:text-zinc-200 [&>a]:border-b [&>a]:border-zinc-700 [&>a]:font-mono [&>a]:text-xs [&>a:hover]:border-zinc-300 [&>a:hover]:text-zinc-200"
        />
      </div>
    </section>
  );
}
