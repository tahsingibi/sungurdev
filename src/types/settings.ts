export interface NavigationItem {
  id: number;
  name: string;
  path: string;
  icon: string;
}

export type SocialItem = NavigationItem;

export interface Project {
  id: string | number;
  name: string;
  explain?: string;
  image?: string;
  live?: string;
  repo?: string;
  tech: string;
  year: string | number;
  icon?: string;
}

export interface Experience {
  id: number;
  image?: string;
  icon?: string;
  name: string;
  title: string;
  year: string;
  path: string;
  description: string;
  projects: Project[];
}

export interface Settings {
  name: string;
  slug: string;
  title: string;
  keywords: string[];
  hiring: boolean;
  resume: string;
  url: string;
  about: string;
  image: string;
  nav: NavigationItem[];
  social: SocialItem[];
  experience: Experience[];
  work: Omit<Project, "year">[];
  pages: {
    write: {
      heading: string;
      description: string;
      error: string;
    };
    works: {
      heading: string;
      description: string;
    };
  };
}
