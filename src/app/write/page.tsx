import { pageMetadata } from '@/src/metadata';
import WriteView from '@/src/view/write';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata.write;

export default async function WritePage() {
  return <WriteView />;
}
