import Code from './code';
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
    h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className="text-4xl font-black pb-4" {...props} />,
    h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="text-3xl font-bold pb-4" {...props} />,
    h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="text-2xl font-semibold pb-4 " {...props} />,
    h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 className="text-xl font-medium pb-4" {...props} />,
    h5: (props: ComponentPropsWithoutRef<'h5'>) => <h5 className="text-lg font-normal pb-4" {...props} />,
    h6: (props: ComponentPropsWithoutRef<'h6'>) => <h6 className="text-base font-light pb-4" {...props} />,
    p: (props: ComponentPropsWithoutRef<'p'>) => <p className="text-lg mb-4" {...props} />,
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
    a: (props: ComponentPropsWithoutRef<'a'>) => <a className="hover:underline font-semibold" {...props} />,
  };
}
