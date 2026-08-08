import About from './about';
import Experience from './experience';
import LatestPosts from './latest-posts';
import Work from './work';
import SectionSeparator from '@/src/components/section-separator';

export default function HomeView() {
  return (
    <>
      <About />
      <SectionSeparator />
      <Experience />
      <SectionSeparator />
      <LatestPosts />
      <SectionSeparator />
      <Work />
      <SectionSeparator />
    </>
  );
}
