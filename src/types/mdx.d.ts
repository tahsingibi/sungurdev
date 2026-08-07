declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { PostMetadata } from "@/src/types/content";

  export const metadata: Omit<PostMetadata, "date">;
  const MDXContent: ComponentType;
  export default MDXContent;
}
