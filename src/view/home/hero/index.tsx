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
      <div className="relative z-10 pt-6 px-6 pb-6 flex items-center gap-6">
        <div className="relative">
          <figure className="relative size-16 bg-white rounded-lg shrink-0 flex items-center justify-center has-[img]:bg-transparent overflow-hidden">
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
          <p>
            <EncryptedText
              text={title}
              className="font-pixel text-sm upp text-zinc-400"
            />
            {!!currentCompany && (
              <EncryptedText
                text={` @ ${currentCompany}`}
                className="font-pixel text-sm upp text-foreground"
              />
            )}
          </p>
        </div>
      </div>
      <div className="p-6 border-t">
        <p
          dangerouslySetInnerHTML={{ __html: aboutContent }}
          className="text-lg text-foreground/75 font-sans [&_.mark]:font-black [&_a]:underline [&_a]:underline-offset-6! [&_a:hover]:decoration-wavy"
        />
      </div>
      <div className="flex justify-between items-center px-6 border-y mb-6">
        <div>
          {social.map((link) => {
            const Icon = SOCIAL_ICONS[
              link.icon as keyof typeof SOCIAL_ICONS
            ] as ComponentType<any> | undefined;
            return (
              <Link key={link.id} href={link.path} target="_blank">
                <Button
                  size="icon-lg"
                  variant="outline"
                  className="rounded-none border-y-0! first:border-l! border-l-0! bg-transparent!"
                >
                  {Icon ? <Icon className="size-4" /> : null}
                </Button>
              </Link>
            );
          })}
        </div>
        {hiring && (
          <Link href={resumeUrl} className="ml-auto" target="_blank">
            <Button
              size="lg"
              variant="outline"
              className="rounded-none border-y-0!"
            >
              <ArrowDownToLine />
              Resume
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
