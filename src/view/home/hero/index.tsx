import { SocialIcon } from "@/components/custom/social-icon";
import settings from "@/lib/settings";
import Link from "next/link";

/**
 * ASCII banner.
 *
 * Sayfanın tek büyük görsel öğesi ve tüm dili tek başına kuran şey. Metin
 * olarak duruyor (görsel değil): seçilebiliyor, temayla renk değiştiriyor,
 * her ekran genişliğinde ölçekleniyor ve tek bir bayt bile indirilmiyor.
 *
 * `aria-label` var çünkü ekran okuyucuya blok karakterleri okumak işkence;
 * içerik `aria-hidden` ve isim `h1`in etiketinden geliyor.
 */
const BANNER = String.raw`
 ███████╗██╗   ██╗███╗   ██╗ ██████╗ ██╗   ██╗██████╗
 ██╔════╝██║   ██║████╗  ██║██╔════╝ ██║   ██║██╔══██╗
 ███████╗██║   ██║██╔██╗ ██║██║  ███╗██║   ██║██████╔╝
 ╚════██║██║   ██║██║╚██╗██║██║   ██║██║   ██║██╔══██╗
 ███████║╚██████╔╝██║ ╚████║╚██████╔╝╚██████╔╝██║  ██║
 ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝`;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 max-sm:flex-col max-sm:gap-0.5 sm:items-baseline">
      <dt className="w-24 shrink-0 text-2xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="min-w-0 text-xs leading-relaxed">{children}</dd>
    </div>
  );
}

export default function Hero() {
  const {
    name,
    title,
    currentCompany,
    about,
    social,
    hiring,
    resume,
    experience,
    work,
    location,
  } = settings;

  const aboutContent = about
    .replaceAll("{lastwork}", experience[0].name)
    .replaceAll("{lastworklink}", experience[0].path);

  // "Şu an ne yayında" — canlı olan projeler künyenin içinde duruyor.
  const shipping = work.filter((project) => project.live).slice(0, 3);

  return (
    <section className="flex flex-col px-6 pt-8 pb-8">
      <h1 className="sr-only">
        {name} — {title}
      </h1>

      <pre
        aria-hidden
        className="nfo-banner nfo-glow text-primary select-all"
      >
        {BANNER}
      </pre>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs uppercase tracking-[0.16em] text-muted-foreground">
        <span className="text-foreground">{name}</span>
        <span aria-hidden>·</span>
        <span className="text-foreground">{title}</span>
        <span aria-hidden>·</span>
        <span>{location}</span>
        <span aria-hidden>·</span>
        <span className={hiring ? "text-primary" : undefined}>
          {hiring ? "● available" : "○ not looking"}
        </span>
        <span aria-hidden className="nfo-caret text-primary">
          █
        </span>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <dl className="flex flex-col gap-2">
          <Field label="current">
            {currentCompany ? (
              <>
                <Link
                  href={experience[0].path}
                  className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-current"
                >
                  {currentCompany}
                </Link>
                <span className="text-muted-foreground">
                  {" "}
                  — end-to-end web apps for individual and corporate clients
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">independent</span>
            )}
          </Field>

          {shipping.length ? (
            <Field label="shipping">
              <span className="flex flex-wrap items-center gap-x-2">
                {shipping.map((project, index) => (
                  <span key={project.id}>
                    {index > 0 ? (
                      <span aria-hidden className="text-border">
                        {" · "}
                      </span>
                    ) : null}
                    <Link
                      href={project.live as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-current"
                    >
                      {project.name.toLowerCase()}
                    </Link>
                  </span>
                ))}
              </span>
            </Field>
          ) : null}

          <Field label="contact">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {social.map((link) => (
                <Link
                  key={link.id}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-current"
                >
                  <SocialIcon name={link.icon} className="size-3.5" />
                  {link.name}
                </Link>
              ))}
              {resume ? (
                <Link
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-current"
                >
                  resume.pdf
                </Link>
              ) : null}
            </span>
          </Field>
        </dl>

        <p
          dangerouslySetInnerHTML={{ __html: aboutContent }}
          className="mt-6 text-xs leading-relaxed text-muted-foreground [&_.mark]:text-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a:hover]:text-primary [&_a:hover]:decoration-current"
        />
      </div>
    </section>
  );
}
