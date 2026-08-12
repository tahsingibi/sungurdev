interface InlineScriptProps {
  html: string;
  type?: string;
}

/**
 * React warns when it encounters a raw <script> tag mid-render because
 * scripts inserted that way (e.g. during a client-side re-render) never
 * execute. Flipping to type="text/plain" once we're in the browser keeps
 * the tag inert there while the server-rendered HTML still parses and runs
 * it normally on first load. See:
 * node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function InlineScript({ html, type = "text/javascript" }: InlineScriptProps) {
  return (
    <script
      type={typeof window === "undefined" ? type : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
