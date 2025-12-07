import Image from 'next/image';
import { Icon } from '../icon';

export default function Avatar({
  image,
  text,
  icon,
  name,
  className = '',
  ...props
}) {
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
