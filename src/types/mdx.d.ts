declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { PostMetadata } from "@/lib/posts";

  export const metadata: PostMetadata;
  export default function MDXContent(props: MDXProps): JSX.Element;
}
