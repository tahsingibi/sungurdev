import Image from 'next/image';
import { Icon } from '../icon';
import type { ComponentPropsWithoutRef } from 'react';
import type { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps extends ComponentPropsWithoutRef<'figure'> {
  image?: ImageProps['src'];
  text?: string;
  icon?: string;
  name?: string;
  priority?: boolean;
}

export default function Avatar({
  image,
  text,
  icon,
  name,
  priority = false,
  className = '',
  ...props
}: AvatarProps) {
  return (
    <figure
      className={cn(
        'relative flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted has-[img]:bg-transparent',
        className,
      )}
      {...props}
    >
      {image && (
        <Image
          src={image}
          fill
          sizes="80px"
          priority={priority}
          className="image object-cover select-none pointer-events-none"
          alt={name || text || ''}
        />
      )}
      {icon && <Icon icon={icon} className="icon text-xl" />}
      {!image && !icon && !!text && !!text?.length && (
        <span className="text select-none pointer-events-none">
          {text?.slice(0, 2)}
        </span>
      )}
    </figure>
  );
}
