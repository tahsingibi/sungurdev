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

const HEADING_STYLES: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "mt-10 mb-4 text-2xl font-medium tracking-tight text-foreground first:mt-0",
  /*
   * Hiyerarşi yalnızca punto ve boşlukla kuruluyor. Bölüm başlıklarının
   * solundaki amber işaret metnin hizasını bozuyordu: paragraflar bir
   * hizada, başlıklar işaret kadar içeride kalıyordu.
   */
  /*
   * Gövde 18px'e çıkınca h2/h3 ona fazla yaklaştı ve başlıklar başlık gibi
   * okunmaz oldu. Hiyerarşi yalnızca puntoyla kurulduğu için (amber işaret
   * kaldırıldı) aradaki farkın belirgin olması gerekiyor: 26 / 22 / 18.
   */
  2: "mt-14 mb-4 text-2xl font-medium tracking-tight text-foreground first:mt-0",
  3: "mt-12 mb-3 text-xl font-medium tracking-tight text-foreground first:mt-0",
  4: "mt-8 mb-2 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground first:mt-0",
  5: "mt-6 mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground first:mt-0",
  6: "mt-6 mb-2 text-2xs font-medium uppercase tracking-[0.2em] text-muted-foreground first:mt-0",
};

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;
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
  ul: ({ children }) => (
    <ul
      className={`${PROSE_INSET} my-6 list-disc space-y-2.5 pl-10 marker:text-muted-foreground`}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className={`${PROSE_INSET} my-6 list-decimal space-y-2.5 pl-10 marker:text-muted-foreground`}
    >
      {children}
    </ol>
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
