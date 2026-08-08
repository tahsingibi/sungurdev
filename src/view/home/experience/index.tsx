import Link from "@/src/components/active-link";
import Avatar from "@/src/components/avatar";
import { Icon } from "@/src/components/icon";
import db from "@/src/settings";
import Heading from "../block-heading";

export default function Experience() {
  const { experience } = db;

  return (
    <section>
      <Heading id="experiences">
        experiences
        <Heading.Link href="/works">view detail</Heading.Link>
      </Heading>
      <div className="grid px-2 py-5 sm:px-6">
        {experience.map(({ id, image, name, title, year, path, icon }) => (
          <Link
            href={path}
            key={id}
            className="group relative flex items-center gap-5 p-4 transition-colors hover:bg-zinc-900/50 active:translate-y-px"
          >
            <Avatar
              image={image}
              icon={icon}
                className="size-9 rounded-none bg-transparent! object-contain"
              text={title}
            />
            <div className="flex flex-col grow">
              <p className="font-medium">
                {name}
                <span className="scale-0 group-hover:scale-100 inline-block group-hover:opacity-100 transition-all duration-150 ease-hover">
                  <Icon
                    icon="arrow-up-short"
                    className="text-2xl inline-block rotate-45 -translate-y-0.5 translate-x-3 leading-none size-0 "
                  />
                </span>
              </p>
              <p className="flex w-full justify-between text-sm text-zinc-400 max-sm:flex-col">
                <span>{title}</span>
                <span>{year}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
