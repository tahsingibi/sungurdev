import { pageMetadata } from '../metadata';
import HomeView from '../view/home';

export const metadata = pageMetadata.home;

export default function Home() {
  return <HomeView />;
}
