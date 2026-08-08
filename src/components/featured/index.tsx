import Image from 'next/image';
import Tweet from '@/src/mdx-components/tweet';
import type { FeaturedBlock } from '@/src/types/content';

function getVideoSource(featured: Extract<FeaturedBlock, { type: 'video' }>) {
  if (featured.provider === 'youtube' && !featured.src.startsWith('http')) {
    return `https://www.youtube.com/embed/${featured.src}`;
  }

  if (featured.provider === 'vimeo' && !featured.src.startsWith('http')) {
    return `https://player.vimeo.com/video/${featured.src}`;
  }

  return featured.src;
}

export default function Featured(props: FeaturedBlock) {
  const caption = props.caption;

  return (
    <figure className="m-0! w-full border-y border-border bg-muted/25 p-3 sm:p-5">
      <div className="overflow-hidden bg-background ring-1 ring-border">
        {props.type === 'image' && (
          <Image
            src={props.src}
            alt={props.alt}
            width={props.width ?? 1280}
            height={props.height ?? 720}
            sizes="(max-width: 720px) 100vw, 720px"
            priority
            className="h-auto w-full object-cover"
          />
        )}

        {props.type === 'x-post' && (
          <div className="mx-auto min-h-[360px] max-w-[550px] px-3 py-5">
            <Tweet id={props.id} />
          </div>
        )}

        {props.type === 'video' && props.provider === 'file' && (
          <video className="aspect-video w-full" controls playsInline preload="metadata" poster={props.poster}>
            <source src={props.src} />
          </video>
        )}

        {props.type === 'video' && props.provider !== 'file' && (
          <iframe
            title={props.title ?? 'Featured video'}
            src={getVideoSource(props)}
            className="aspect-video w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 px-1 font-mono text-[10px] leading-5 tracking-wide text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
