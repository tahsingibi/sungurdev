import {
  GithubIcon,
  LinkedInIcon,
  XTwitterIcon,
} from "@/components/custom/icons";
import { Button } from "@/components/ui/button";
import { EncryptedText } from "@/components/ui/encrypted-text";
import settings from "@/lib/settings";
import { ArrowDownToLine, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";

const SOCIAL_ICONS = {
  "twitter-x": XTwitterIcon,
  linkedin: LinkedInIcon,
  github: GithubIcon,
  mail: Mail,
};

export default function Hero() {
  const {
    name,
    title,
    currentCompany = null,
    about,
    social,
    hiring,
    url,
    resume,
  } = settings;
  const aboutContent = about
    .replaceAll("{lastwork}", settings.experience[0].name)
    .replaceAll("{lastworklink}", settings.experience[0].path);

  const resumeUrl = url + !!resume ? resume : "";
  return (
    <div className="flex flex-col relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-3xl bg-primary/20 blur-3xl"
      />

      <div className="relative z-10 pt-6 px-6 pb-6 flex items-center gap-6">
        <div className="relative">
          <figure className="relative size-16 bg-white rounded-2xl shrink-0 flex items-center justify-center has-[img]:bg-transparent overflow-hidden ring-4 ring-background shadow-soft">
            <Image
              src="/img/profile.jpeg"
              alt="Profile"
              fill
              className="object-cover scale-140 translate-x-2 translate-y-2"
            />
          </figure>
        </div>

        <div>
          <h1 className="text-3xl">{name}</h1>
          <p className="mt-1.5 w-fit rounded-md bg-muted/60 px-2.5 py-1">
            <EncryptedText
              text={title}
              className="font-pixel text-xs text-muted-foreground"
            />
            {!!currentCompany && (
              <EncryptedText
                text={` @ ${currentCompany}`}
                className="font-pixel text-xs text-foreground"
              />
            )}
          </p>
        </div>
      </div>
      <div className="relative z-10 p-6 border-t border-border/60">
        <p
          dangerouslySetInnerHTML={{ __html: aboutContent }}
          className="text-foreground/75 font-sans [&_.mark]:font-black [&_a]:underline [&_a]:text-foreground  [&_a]:underline-offset-6! [&_a:hover]:decoration-wavy"
        />
      </div>
      <div className="relative z-10 flex items-center gap-1 px-6 pb-6">
        {social.map((link) => {
          const Icon = SOCIAL_ICONS[link.icon as keyof typeof SOCIAL_ICONS] as
            | ComponentType<any>
            | undefined;
          return (
            <Link key={link.id} href={link.path} target="_blank">
              <Button size="icon" variant="ghost">
                {Icon ? <Icon className="size-4" /> : null}
              </Button>
            </Link>
          );
        })}
        {hiring && (
          <Link href={resumeUrl} target="_blank" className="ml-1">
            <Button variant="ghost">
              <ArrowDownToLine />
              Resume
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
