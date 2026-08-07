export interface PostMetadata {
  title: string;
  publishDate: string;
  description: string;
  category: string;
  date?: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
}

export interface PostStore {
  all: Post[];
  latest: Post[];
  findBySlug: (slug: string | null) => Post | undefined;
}

export interface MdxModule {
  metadata?: Partial<Omit<PostMetadata, "date">>;
}
