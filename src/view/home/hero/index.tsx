import { SocialIcon } from "@/components/custom/social-icon";
import settings from "@/lib/settings";
import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * ASCII banner.
 *
 * Sayfanın imzası. Kolonun tamamını kaplarken bir afişti ve altındaki her
 * şeyi bastırıyordu; şimdi künyenin üstünde duran bir başlık — ilk bakılan
 * şey olmayı sürdürüyor ama sırasını bekliyor.
 *
 * Metin olarak duruyor (görsel değil): seçilebiliyor, temayla renk
 * değiştiriyor, her ekran genişliğinde ölçekleniyor ve tek bir bayt bile
 * indirilmiyor.
 *
 * `aria-hidden` çünkü ekran okuyucuya blok karakterleri okumak işkence;
 * isim `h1`in kendisinden geliyor.
 */
const BANNER = String.raw`
 ███████╗██╗   ██╗███╗   ██╗ ██████╗ ██╗   ██╗██████╗
 ██╔════╝██║   ██║████╗  ██║██╔════╝ ██║   ██║██╔══██╗
 ███████╗██║   ██║██╔██╗ ██║██║  ███╗██║   ██║██████╔╝
 ╚════██║██║   ██║██║╚██╗██║██║   ██║██║   ██║██╔══██╗
 ███████║╚██████╔╝██║ ╚████║╚██████╔╝╚██████╔╝██║  ██║
 ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝`;

export default function Hero() {
  const {
    name,
    slug,
    title,
    about,
    social,
    hiring,
    resume,
    experience,
    location,
    image,
  } = settings;

  const aboutContent = about
    .replaceAll("{lastwork}", experience[0].name)
    .replaceAll("{lastworklink}", experience[0].path);

  return (
    <section className="flex flex-col gap-5">
      <h1 className="sr-only">
        {name} — {title}
      </h1>

      {/* <pre aria-hidden className="ascii-banner select-all text-primary">
        {BANNER}
      </pre> */}

      <div className="flex flex-wrap items-center gap-3.5">
        <Image
          src={image}
          alt=""
          width={44}
          height={44}
          priority
          className="size-11 shrink-0 rounded-xl object-cover"
        />
        <div className="flex min-w-0 flex-col">
          <span className="text-base font-medium text-foreground">{name}</span>
          <span className="text-sm text-muted-foreground">@{slug}</span>
        </div>

        {/*
          Durum rozeti künyenin sağ ucunda: aranan tek bilgi "müsait mi", ve
          göz zaten satırın sonunu tarıyor. Yazı hover'da açılıyor (bkz.
          `.status` / `.status-label`), duran şey yalnızca nokta — ama metin
          DOM'da kaldığı için okuyucudan gizlenmiş olmuyor.
        */}
        {hiring ? (
          <span
            tabIndex={0}
            className="status ml-auto inline-flex shrink-0 items-center gap-2 rounded-full font-mono text-2xs text-emerald-500 outline-none"
          >
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15"
            />
            <span className="status-label whitespace-nowrap">open to work</span>
          </span>
        ) : null}
      </div>

      <p
        dangerouslySetInnerHTML={{ __html: aboutContent }}
        className="text-sm leading-loose text-muted-foreground [&_.mark]:font-medium [&_.mark]:text-foreground [&_a]:font-mono [&_a]:text-[0.92em] [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a:hover]:decoration-current"
      />

      {/*
        Sosyal alan yalnızca ikon: adları yazınca satır beş etikete bölünüyor
        ve hiçbiri okunmuyordu — bu ikonlar zaten tanınan markalar. `resume`
        etiketli kalıyor, çünkü onun adı bilginin kendisi: dosya, ikon değil.
      */}
      <div className="flex flex-wrap items-center gap-1">
        {social.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <SocialIcon name={link.icon} className="size-[1.05rem]" />
          </Link>
        ))}

        {resume ? (
          <Link
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex h-9 items-center gap-2 rounded-lg px-3 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            resume.pdf
            <ArrowDownToLine aria-hidden className="size-3.5" />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
