import Link from "@/src/components/active-link";
import Avatar from "@/src/components/avatar";
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
            className="group relative flex items-center gap-5 p-4 transition-colors hover:bg-accent/60 active:translate-y-px"
          >
            <Avatar
              image={image}
              icon={icon}
                className="size-9 rounded-none bg-transparent! object-contain"
              text={title}
            />
            <div className="flex flex-col grow">
              <p className="font-medium">{name}</p>
              <p className="flex w-full justify-between text-sm text-muted-foreground max-sm:flex-col">
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
