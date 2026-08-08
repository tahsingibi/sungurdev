import type { ComponentPropsWithoutRef } from 'react';

const Pre = (props: ComponentPropsWithoutRef<'pre'>) => {
  return <>{props.children}</>;
};

export default Pre;
