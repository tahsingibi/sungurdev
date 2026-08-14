import { CodeBlock, CodeBlockCommand } from "@/components/custom/code-block";
import { ComponentPreview } from "@/components/custom/component-preview";
import type { MDXComponents } from "mdx/types";
import { isValidElement, type ReactNode } from "react";

const HEADING_CLASSNAME =
  "mb-3 mt-10 text-xl font-medium text-foreground first:mt-0 sm:text-2xl";

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;
  return function Heading({ children }: { children?: ReactNode }) {
    return <Tag className={HEADING_CLASSNAME}>{children}</Tag>;
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
    <p className="my-5 whitespace-pre-wrap first:mt-0 last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-5 list-disc space-y-2 pl-6 marker:text-muted-foreground">
      {children}
    </ul>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline underline-offset-4 hover:decoration-wavy"
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
