export interface NavigationItem {
  id: number;
  name: string;
  path: string;
  icon: string;
}

export interface SocialLink {
  id: number;
  name: string;
  icon: string;
  path: string;
}

export interface Project {
  id: string | number;
  name: string;
  explain?: string;
  image?: string;
  icon?: string;
  live?: string;
  repo?: string;
  tech: string;
  year?: string | number;
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

export interface PageSettings {
  heading: string;
  description: string;
  error?: string;
  path: string;
}

export interface SeoSettings {
  description: string;
  locale: string;
  ogLocale: string;
  themeColor: string;
  googleSiteVerification?: string;
  ahrefsSiteVerification?: string;
}

export interface AnalyticsSettings {
  googleAnalyticsId?: string;
  webVitalsEndpoint?: string;
}

export interface BlogSettings {
  contentDirectory: string;
  repository: string;
  repositoryBranch: string;
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
  currentCompany?: string;
  image: string;
  nav: NavigationItem[];
  social: SocialLink[];
  experience: Experience[];
  work: Project[];
  pages: {
    write: PageSettings;
    works: PageSettings;
    projects: PageSettings;
  };
  seo: SeoSettings;
  analytics: AnalyticsSettings;
  blog: BlogSettings;
}
