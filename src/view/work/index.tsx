import Avatar from '@/src/components/avatar';
import { Icon } from '@/src/components/icon';
import db from '@/src/settings';
import Link from 'next/link';

export default function ExperienceView() {
  const { heading, description } = db.pages.works;
  const { experience } = db;
  return (
    <>
      <div className="flex flex-col leading-loose gap-2 border-b border-zinc-900 pb-12">
        <h2 className="text-4xl text-white">{heading}</h2>
        <p className="text-zinc-500">{description}</p>
      </div>
      <div className="flex flex-col">
        {experience.map((work) => (
          <div
            id={work.name}
            key={work.id}
            className="flex flex-col gap-2 border-b border-zinc-800 pb-8 mb-8 last:pb-0 last:mb-0 last:border-none"
          >
            <div className="flex flex-col gap-0">
              <h2 className="text-2xl leading-loose font-medium">
                {work.name}
              </h2>
              <span className="text-sm font-mono opacity-60">{work.year}</span>
            </div>
            <div
              className="leading-loose text-zinc-400 prose"
              dangerouslySetInnerHTML={{ __html: work.description }}
            />

            <div className="grid gap-1 my-8 empty:hidden">
              {work?.projects?.map(
                ({ id, name, image, live, repo, year, tech, icon }) => {
                  const path = live || repo || '#';
                  return (
                    <Link
                      key={id}
                      className="flex items-center gap-4 active:translate-y-px transition-all relative group p-4 hover:bg-zinc-900/40 "
                      href={path}
                      target="_blank"
                    >
                      <Avatar
                        image={image}
                        text={name}
                        icon={icon}
                        name={work.name}
                        className="size-8 bg-transparent!"
                      />
                      <p className="flex flex-col gap-1 text-pretty pr-12">
                        <span className="line-clamp-1">{name}</span>
                        <span className="text-sm opacity-60">
                          <span className="font-mono">{year}</span>
                          {' – '}
                          {tech}
                        </span>
                      </p>

                      <span className="absolute right-0 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 inline-block group-hover:opacity-100 transition-all duration-150 ease-hover">
                        <Icon
                          icon="arrow-up-short"
                          className="text-2xl inline-block rotate-90 -translate-y-0.5 scale-0 group-hover:scale-125 group-hover:-translate-x-2 leading-none size-0 "
                        />
                      </span>
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
