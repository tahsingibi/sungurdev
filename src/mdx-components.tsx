import { CodeBlock, CodeBlockCommand } from "@/components/custom/code-block";
import { ComponentPreview } from "@/components/custom/component-preview";
import type { MDXComponents } from "mdx/types";
import { isValidElement, type ReactNode } from "react";

/**
 * Başlık ölçeği.
 *
 * Altı seviye de aynı sınıfı kullanıyordu, yani h2 ile h3 birbirinden
 * ayırt edilemiyordu — uzun bir yazıda okuyucunun nerede olduğunu anlaması
 * imkânsızdı. Her seviyenin artık kendi ağırlığı var.
 *
 * h2 ayrıca solunda amber bir işaret taşıyor: yazının ana bölümleri sayfanın
 * geri kalanındaki `[ BÖLÜM ]` diliyle aynı sinyali veriyor.
 */
/**
 * Metin bloklarının iç girintisi.
 *
 * Yalnızca *okunan* öğelere uygulanıyor: paragraflar, listeler, başlıklar.
 * Kod blokları ve görseller bu girintiyi almıyor, yani kabın tam genişliğini
 * kullanıyorlar — sonuç, metnin rahat bir satır uzunluğuna inmesi ve kodun
 * nefes alması. İkisine aynı genişliği vermek her ikisi için de yanlıştı.
 */
const PROSE_INSET = "sm:px-8";

/**
 * Başlık ölçeği — başlıklar mono, gövde sans.
 *
 * Sitedeki her başlık mono: `[ SHIPPED ]`, panel etiketleri, künye satırları,
 * proje adları. Yazı gövdesi uzun okuma için bilerek sans'a geçiyor, ama
 * başlıklar da sans olunca yazı sayfası arayüzün geri kalanıyla akrabalığını
 * kaybediyor ve standart bir blog şablonu gibi duruyordu. Başlıkları mono'ya
 * çevirmek bağı geri kuruyor; kısa oldukları için okuma hızından bir şey
 * götürmüyor.
 *
 * Hiyerarşi punto ve boşlukla: 26 / 22 / 18.
 *
 * Bölüm başlıklarının *solundaki* amber işaret daha önce denenmiş ve metnin
 * hizasını bozduğu için kaldırılmıştı. İşaret bu kez sağa alındı: h2'nin
 * ardından satır sonuna kadar uzanan ince bir hat — sayfanın geri kalanındaki
 * `[ BÖLÜM ]────` kalıbının aynısı. Metnin peşinden geldiği için hiçbir şeyin
 * hizasını bozmuyor.
 */
const HEADING_STYLES: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "mt-10 mb-4 font-mono text-2xl tracking-tight text-foreground first:mt-0",
  2: "mt-14 mb-4 font-mono text-2xl tracking-tight text-foreground first:mt-0",
  3: "mt-12 mb-3 font-mono text-xl tracking-tight text-foreground first:mt-0",
  4: "mt-8 mb-2 font-mono text-sm uppercase tracking-[0.16em] text-muted-foreground first:mt-0",
  5: "mt-6 mb-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground first:mt-0",
  6: "mt-6 mb-2 font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground first:mt-0",
};

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;
  /*
   * Hat bölüm başlıklarında (h1–h3). Yazılar bölümlerini `###` ile açıyor,
   * yani pratikte hattı taşıyan seviye h3. h4 ve altı zaten küçük, büyük
   * harfli etiketler — onlara hat eklemek sayfayı çizgi çizgi yapardı.
   */
  const ruled = level <= 3;

  return function Heading({ children }: { children?: ReactNode }) {
    if (!ruled) {
      return (
        <Tag className={`${PROSE_INSET} ${HEADING_STYLES[level]}`}>
          {children}
        </Tag>
      );
    }

    return (
      <Tag
        className={`${PROSE_INSET} ${HEADING_STYLES[level]} flex items-center gap-4`}
      >
        <span className="min-w-0">{children}</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </Tag>
    );
  };
}

const FENCE_META_PATTERN = /^language-([^/\s]+)(?:\/filename=(.+))?$/;

function Pre({ children }: { children?: ReactNode }) {
  if (
    !isValidElement<{ className?: string; children?: ReactNode }>(children)
  ) {
    return <pre>{children}</pre>;
  }

  const { className, children: rawCode } = children.props;
  const match = FENCE_META_PATTERN.exec(className ?? "");
  const code = typeof rawCode === "string" ? rawCode.replace(/\n$/, "") : "";

  return <CodeBlock code={code} language={match?.[1]} filename={match?.[2]} />;
}

const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ children }) => (
    <p className={`${PROSE_INSET} my-6 whitespace-pre-wrap first:mt-0 last:mb-0`}>
      {children}
    </p>
  ),
  /*
   * Liste işaretleri kare ve amber.
   *
   * Yuvarlak nokta bu arayüzdeki tek yuvarlak öğe olarak kalıyordu
   * (`--radius: 0`) ve gri işaret maddeyi metinden ayırmıyordu. Girinti de
   * 10 → 6 birime indi: `PROSE_INSET` zaten bir girinti veriyor, ikisi
   * üst üste gelince listeler paragraflardan kopuk duruyordu.
   */
  ul: ({ children }) => (
    <ul
      className={`${PROSE_INSET} my-6 list-[square] space-y-2.5 pl-6 marker:text-primary/60`}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className={`${PROSE_INSET} my-6 list-decimal space-y-2.5 pl-6 marker:font-mono marker:text-primary/60`}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1.5">{children}</li>,
  /*
   * Aşağıdakiler daha önce hiç eşlenmemişti: yazıya bir alıntı, ayraç,
   * görsel ya da tablo girdiği anda tarayıcının varsayılan stili çıkıyordu —
   * Times New Roman alıntılar, kenarlıksız tablolar. Artık hepsi arayüzün
   * kendi diliyle çiziliyor.
   */
  blockquote: ({ children }) => (
    <blockquote
      className={`${PROSE_INSET} my-8 border-l-2 border-primary/50 pl-4 text-muted-foreground [&>p]:px-0`}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <div className={`${PROSE_INSET} my-12`}>
      <hr className="border-t border-border" />
    </div>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="my-8 w-full border border-border"
    />
  ),
  /*
   * Tablo kendi kabında yatay kayıyor: dar ekranda taşan bir tablo sayfanın
   * tamamını yana kaydırıyordu.
   */
  table: ({ children }) => (
    <div className="scroll-thin my-8 border border-border">
      <table className="w-full border-collapse text-xs">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border px-3 py-2 text-left text-2xs uppercase tracking-[0.16em] font-normal text-muted-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-3 py-2 align-top">{children}</td>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-current"
    >
      {children}
    </a>
  ),
  pre: Pre,
  ComponentPreview,
  CodeBlockCommand,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
