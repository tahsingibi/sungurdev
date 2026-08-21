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
 * Artık boş: kolonun kendisi 490px, yani metin zaten okuma genişliğinde.
 * Girinti geniş bir kap içinde metni daraltmak için vardı; bu kolonda ise
 * paragrafları başlıklara göre içeri kaydırıp hizayı bozuyordu. Sabit
 * korunuyor ki bir gün kap genişlerse tek yerden geri açılabilsin.
 */
const PROSE_INSET = "";

/**
 * Başlık ölçeği.
 *
 * Gövdeyle aynı yazı tipinde: başlıklar mono iken yazı sayfası arayüzle
 * akraba görünüyordu ama metnin kendi içinde iki ayrı ses çıkıyordu. Ayrım
 * artık punto ve ağırlıkla — bir yazının içinde gereken tek ayrım bu.
 *
 * Hiyerarşi: 22 / 20 / 18, altındakiler küçük harfli etiketler.
 */
const HEADING_STYLES: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "mt-10 mb-4 text-xl font-medium tracking-tight text-foreground first:mt-0",
  2: "mt-12 mb-4 text-xl font-medium tracking-tight text-foreground first:mt-0",
  3: "mt-10 mb-3 text-lg font-medium tracking-tight text-foreground first:mt-0",
  4: "mt-8 mb-2 text-base font-medium text-foreground first:mt-0",
  5: "mt-6 mb-2 font-mono text-xs lowercase text-muted-foreground first:mt-0",
  6: "mt-6 mb-2 font-mono text-2xs lowercase text-muted-foreground first:mt-0",
};

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;

  /*
   * Başlığın peşinden giden hat kalktı: dar kolonda başlık satırın çoğunu
   * kaplıyor ve hattan geriye birkaç piksellik bir çizgi kalıyordu — hem
   * anlamsız hem de yazının içine sayfa arayüzünden bir öğe taşıyordu.
   */
  return function Heading({ children }: { children?: ReactNode }) {
    return (
      <Tag className={`${PROSE_INSET} ${HEADING_STYLES[level]}`}>{children}</Tag>
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
      className={`${PROSE_INSET} my-6 list-disc space-y-2.5 pl-5 marker:text-border`}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className={`${PROSE_INSET} my-6 list-decimal space-y-2.5 pl-5 marker:font-mono marker:text-muted-foreground`}
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
      className={`${PROSE_INSET} my-8 border-l-2 border-border pl-4 text-muted-foreground [&>p]:px-0`}
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
      className="my-8 w-full rounded-lg border border-border"
    />
  ),
  /*
   * Tablo kendi kabında yatay kayıyor: dar ekranda taşan bir tablo sayfanın
   * tamamını yana kaydırıyordu.
   */
  table: ({ children }) => (
    <div className="scroll-thin my-8 rounded-lg border border-border">
      <table className="w-full border-collapse text-xs">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border px-3 py-2 text-left font-mono text-2xs lowercase font-normal text-muted-foreground">
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
    <code className="rounded-sm border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
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
