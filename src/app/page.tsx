import { pageMetadata } from '../metadata';
import HomeView from '../view/home';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata.home;

export default function Home() {
  return <HomeView />;
}
