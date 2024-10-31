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
      className="rounded-full p-2 bg-zinc-900 size-12 aspect-square grid place-items-center mb-2 group"
    >
      <Icon
        icon="arrow-left-short"
        className="text-xl group-hover:-translate-x-1 transition-all duration-300 ease-linear"
      />
    </Link>
  );
}
