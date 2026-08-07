import { robots as metadataRobots } from '../metadata';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { ...metadataRobots };
}
