import Avatar from "@/src/components/avatar";
import settings from "@/src/settings";
import Social from "../social";

export default function About() {
  const { name, slug, hiring, about: _about } = settings;
  const about = _about
    .replaceAll("{lastwork}", settings.experience[0].name)
    .replaceAll("{lastworklink}", settings.experience[0].path);

  return (
    <section aria-labelledby="profile-heading">
      <div className="relative h-56 overflow-hidden border-b border-border bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-[size:56px_56px] sm:h-72">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rotate-[30deg] border border-foreground/25 sm:size-44"
        >
          <div className="absolute -inset-7 border border-foreground/15" />
          <div className="absolute inset-7 border border-foreground/25" />
          <div className="absolute -left-24 top-20 h-12 w-20 border border-foreground/15" />
        </div>
        <span className="absolute bottom-4 right-5 font-mono text-[9px] tracking-[0.22em] text-muted-foreground">
          FIG_001
        </span>
      </div>

      <div className="relative flex flex-col gap-5 px-6 pb-8 sm:px-10">
        <div className="-mt-12 flex items-end gap-5 sm:-mt-16">
          <Avatar
            image="/img/profile.jpeg"
            name={name}
            priority
            className="size-24 overflow-hidden rounded-full ring-4 ring-background sm:size-32"
          />
          <div className="min-w-0 pb-2">
            <h1
              id="profile-heading"
              className="truncate text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl"
            >
              {name}
            </h1>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              Creating with code. Small details matter.
            </p>
          </div>
        </div>

        <div>
          <div className="grid border-y border-foreground/10 font-mono text-xs sm:grid-cols-2">
            <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3.5 text-foreground/70 sm:border-r">
              <span className="text-foreground/35">01</span>
              {settings.title}
            </div>
            <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3.5 text-foreground/70">
              <span className="text-foreground/35">02</span>Izmir, Türkiye
            </div>
            <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3.5 text-foreground/70 sm:border-b-0 sm:border-r">
              <span className="text-foreground/35">03</span>@{slug}
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5 text-foreground/70">
              <span className="text-foreground/35">04</span>
              {hiring ? "Available for selected work" : "Currently unavailable"}
            </div>
          </div>

          <Social />
        </div>
      </div>

      <div className="relative px-6 py-10 before:absolute before:left-1/2 before:top-0 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border sm:px-10">
        <p className="mb-5 font-mono text-sm italic text-foreground">
          Good morning
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: about }}
          className="text-pretty text-base leading-7 text-muted-foreground [&>.mark]:font-medium [&>.mark]:text-foreground [&>a]:border-b [&>a]:border-foreground/30 [&>a]:font-mono [&>a]:text-xs [&>a:hover]:border-foreground [&>a:hover]:text-foreground"
        />
      </div>
    </section>
  );
}
