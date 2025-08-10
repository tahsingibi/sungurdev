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
      className="rounded-full p-2 bg-zinc-900 size-10 aspect-square grid place-items-center mb-2 group relative overflow-hidden active:scale-90 duration-500 ease-hover"
    >
      <Icon
        icon="arrow-left-short"
        className="text-lg group-hover:-translate-x-8 transition-all duration-500  aspect-square flex scale-100 group-hover:scale-0 ease-[cubic-bezier(0.65,0,0.35,1.5)]"
      />
      <Icon
        icon="arrow-left-short"
        className="text-lg  transition-all duration-500  aspect-square flex absolute left-1/2 top-1/2 -translate-y-1/2 scale-0 translate-x-full group-hover:scale-100 group-hover:-translate-x-1/2 ease-[cubic-bezier(0.65,0,0.35,1.5)]"
      />
    </Link>
  );
}
