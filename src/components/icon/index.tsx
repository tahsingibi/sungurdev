import type { ComponentPropsWithoutRef } from 'react';

interface IconProps extends ComponentPropsWithoutRef<'i'> {
  icon: string;
}

export function Icon({ icon, className = '', ...props }: IconProps) {
  return <i className={`ri-${icon} ${className}`} {...props} />;
}
