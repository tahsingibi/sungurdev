import { pageMetadata } from '@/src/metadata';
import WorkView from '@/src/view/work';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata.works;

export default function Works() {
  return <WorkView />;
}
