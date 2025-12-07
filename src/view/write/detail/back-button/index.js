'use client';
import Link from '@/src/components/active-link';
import { Icon } from '@/src/components/icon';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <Link
      href="#"
      onClick={() => router.back()}
      passHref
      className="rounded-full p-2 bg-zinc-900 size-10 mb-2 group relative active:scale-90 duration-500 ease-hover overflow-hidden"
    >
      <span className="w-20 h-10 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 -translate-x-2 group-hover:-translate-x-12 duration-500 ease-hover cubic-bezier(0.4, 0, 0.2, 1)">
        <Icon
          icon="arrow-left-s-line"
          className="size-10 flex items-center justify-center"
        />
        <Icon
          icon="arrow-left-s-line"
          className="size-10 flex items-center justify-center"
        />
      </span>
    </Link>
  );
}
