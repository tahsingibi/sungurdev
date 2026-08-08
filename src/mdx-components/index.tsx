import Code from './code';
import Featured from '@/src/components/featured';
import InlineCode from './inline-code';
import Pre from './pre';
import Source from './source';
import Tweet from './tweet';
import YouTube from './youtube';
import { CodeBlockCommand } from '@/src/components/code-block-command';
import { ComponentPreview } from '@/src/components/component-preview';
import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Featured,
    CodeBlockCommand,
    ComponentPreview,
    YouTube,
    pre: Pre,
    Source,
    code: (props: ComponentPropsWithoutRef<'code'>) => {
      const { className, children } = props;
      if (className) {
        return <Code {...props} />;
      }
      return <InlineCode>{children}</InlineCode>;
    },
    Tweet: (props: { id: string; className?: string }) => <Tweet {...props} />,
    h1: (props: ComponentPropsWithoutRef<'h1'>) => <h2 className="mb-5 mt-10 text-3xl font-semibold tracking-[-0.03em] text-foreground first:mt-0" {...props} />,
    h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="mb-5 mt-10 text-3xl font-semibold tracking-[-0.03em] text-foreground first:mt-0" {...props} />,
    h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="mb-4 mt-9 text-2xl font-medium tracking-[-0.02em] text-foreground" {...props} />,
    h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 className="mb-4 mt-8 text-xl font-medium text-foreground" {...props} />,
    h5: (props: ComponentPropsWithoutRef<'h5'>) => <h5 className="mb-3 mt-7 text-lg font-medium text-foreground" {...props} />,
    h6: (props: ComponentPropsWithoutRef<'h6'>) => <h6 className="mb-3 mt-6 font-mono text-sm font-medium uppercase tracking-wider text-foreground" {...props} />,
    p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mb-5 text-base leading-7 text-muted-foreground" {...props} />,
    strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong className="font-semibold text-foreground" {...props} />,
    em: (props: ComponentPropsWithoutRef<'em'>) => <em className="text-foreground" {...props} />,
    li: (props: ComponentPropsWithoutRef<'li'>) => <li className="pb-1.5 pl-1 text-muted-foreground marker:text-foreground/60" {...props} />,
    ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="mb-5 list-disc pl-6" {...props} />,
    ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="mb-5 list-decimal pl-6" {...props} />,
    hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr className="my-9 border-border" {...props} />,
    blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote
        className="my-7 border-l-2 border-foreground/30 bg-muted/50 py-3 pl-5 pr-4 text-muted-foreground [&>p:last-child]:mb-0"
        {...props}
      />
    ),
    a: (props: ComponentPropsWithoutRef<'a'>) => <a className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground" {...props} />,
  };
}
