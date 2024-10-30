import { pageMetadata } from '@/src/metadata';
import WorkView from '@/src/view/work';

export const metadata = pageMetadata.works;

export default function Works() {
  return <WorkView />;
}
