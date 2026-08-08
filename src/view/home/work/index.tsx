import Avatar from "@/src/components/avatar";
import db from "@/src/settings";
import Link from "next/link";
import Heading from "../block-heading";

export default function Work() {
  const { experience } = db;

  const work =
    experience.find((exp) => exp.name === "Freelance")?.projects.slice(0, 3) ?? [];

  return (
    <section>
      <Heading id="works">
        works{" "}
        <Heading.Link href="/works">
          see all
        </Heading.Link>
      </Heading>
      <div className="grid px-2 py-5 sm:px-6">
        {work.map(({ id, name, explain, repo, live, icon = "code" }) => (
          <div
            key={id}
            className="group relative flex overflow-hidden p-4 transition-colors hover:bg-accent/60 max-sm:flex-col max-sm:gap-4 sm:justify-between"
          >
            <div className="flex sm:justify-between gap-6 overflow-hidden relative">
              <Avatar
                icon={icon}
                className="text-xl bg-transparent! translate-y-1 size-8"
              />
              <div className="grid mt-auto gap-4 transition-all duration-300 pr-8">
                <div className="grid ">
                  <Link
                    href={live || repo || "#"}
                    className="font-medium"
                    target="_blank"
                  >
                    {name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{explain}</p>
                </div>
              </div>
            </div>
            <div className="transition-all duration-500 flex gap-2 [&>a]:font-mono [&>a:active]:translate-y-px [&>a]:uppercase text-xs sm:ml-auto sm:mt-auto max-sm:w-full max-sm:pl-14">
              {repo && (
                <Link
                  href={repo}
                  target="_blank"
                  className="relative inline text-foreground hover:underline"
                >
                  Github
                </Link>
              )}
              {live && (
                <Link href={live} target="_blank">
                  live
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
