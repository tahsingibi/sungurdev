import NextLink from 'next/link';

function Heading({ children, className = '', ...props }) {
  return (
    <h4 className={`text-lg relative ${className}`} {...props}>
      {children}
    </h4>
  );
}

function HeadingLink({ children, className = '', ...props }) {
  const { href, ...rest } = props;

  return (
    <NextLink
      href={href}
      className={`ml-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors ${className}`}
      {...rest}
    >
      {children}
    </NextLink>
  );
}

Heading.Link = HeadingLink;

export default Heading;
export { HeadingLink as Link };
