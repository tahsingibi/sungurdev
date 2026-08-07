import Link from "@/src/components/active-link";
import Avatar from "@/src/components/avatar";
import { Icon } from "@/src/components/icon";
import db from "@/src/settings";
import Heading from "../block-heading";

export default function Experience() {
  const { experience } = db;

  return (
    <div className="grid gap-2">
      <Heading id="experiences">
        experiences
        <Heading.Link href="/works">view detail</Heading.Link>
      </Heading>
      <div className="grid gap-1">
        {experience.map(({ id, image, name, title, year, path, icon }) => (
          <Link
            href={path}
            key={id}
            className="flex items-center gap-6 flex-wrap relative active:translate-y-px group hover:bg-zinc-900/40 p-4 rounded-lg"
          >
            <Avatar
              image={image}
              icon={icon}
              className="size-8 object-contain bg-transparent!"
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
              <p className="text-zinc-500 flex max-sm:flex-col justify-between w-full text-sm">
                <span>{title}</span>
                <span>{year}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
