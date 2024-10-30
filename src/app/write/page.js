import { pageMetadata } from '@/src/metadata';
import WriteView from '@/src/view/write';

export const metadata = pageMetadata.write;

export default async function WritePage() {
  return <WriteView />;
}
