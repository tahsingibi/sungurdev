export type FeaturedBlock =
  | {
      type: 'image';
      src: string;
      alt: string;
      caption?: string;
      width?: number;
      height?: number;
    }
  | {
      type: 'x-post';
      id: string;
      caption?: string;
    }
  | {
      type: 'video';
      src: string;
      title?: string;
      caption?: string;
      provider?: 'youtube' | 'vimeo' | 'file';
      poster?: string;
    };

export interface PostMetadata {
  title: string;
  publishDate: string;
  description: string;
  category: string;
  date?: string;
  featured?: FeaturedBlock;
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
  metadata?: Partial<Omit<PostMetadata, 'date'>>;
}
