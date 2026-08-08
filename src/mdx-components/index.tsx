import Code from './code';
import Featured from '@/src/components/featured';
import InlineCode from './inline-code';
import Pre from './pre';
import Source from './source';
import Tweet from './tweet';
import YouTube from './youtube';
import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Featured,
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
    h1: (props: ComponentPropsWithoutRef<'h1'>) => <h2 className="pb-4 text-3xl font-semibold tracking-tight text-zinc-100" {...props} />,
    h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="pb-4 text-3xl font-semibold tracking-tight text-zinc-100" {...props} />,
    h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="pb-4 text-2xl font-medium tracking-tight text-zinc-100" {...props} />,
    h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 className="pb-4 text-xl font-medium text-zinc-200" {...props} />,
    h5: (props: ComponentPropsWithoutRef<'h5'>) => <h5 className="pb-4 text-lg font-normal text-zinc-200" {...props} />,
    h6: (props: ComponentPropsWithoutRef<'h6'>) => <h6 className="pb-4 text-base font-medium text-zinc-300" {...props} />,
    p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mb-5 text-base leading-7" {...props} />,
    li: (props: ComponentPropsWithoutRef<'li'>) => <li className="pb-1" {...props} />,
    ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc pl-6 pb-4" {...props} />,
    ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal pl-6 pb-4" {...props} />,
    hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr className="my-4" {...props} />,
    blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote
        style={{ paddingBottom: 0 }}
        className="border-l-4 pl-4 my-4"
        {...props}
      />
    ),
    a: (props: ComponentPropsWithoutRef<'a'>) => <a className="font-medium text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:decoration-zinc-300" {...props} />,
  };
}
