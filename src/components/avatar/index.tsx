import Image from 'next/image';
import { Icon } from '../icon';
import type { ComponentPropsWithoutRef } from 'react';
import type { ImageProps } from 'next/image';

interface AvatarProps extends ComponentPropsWithoutRef<'figure'> {
  image?: ImageProps['src'];
  text?: string;
  icon?: string;
  name?: string;
}

export default function Avatar({
  image,
  text,
  icon,
  name,
  className = '',
  ...props
}: AvatarProps) {
  return (
    <figure
      className={`relative size-12 bg-zinc-800/60 rounded-lg shrink-0 flex items-center justify-center has-[img]:bg-transparent ${className}`}
      {...props}
    >
      {image && (
        <Image
          src={image}
          fill
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
