import type { ComponentPropsWithoutRef } from 'react';

const Pre = (props: ComponentPropsWithoutRef<'pre'>) => {
  return <pre className="p-0! bg-transparent" {...props} />;
};

export default Pre;
