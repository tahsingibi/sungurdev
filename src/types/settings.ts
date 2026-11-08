export interface NavigationItem {
  id: number;
  name: string;
  description?: string;
  path: string;
  icon: string;
}

export interface SocialLink {
  id: number;
  name: string;
  label: string;
  icon: string;
  path: string;
}

export interface ProjectLogo {
  src: string;
  monochrome?: boolean;
}

export interface Project {
  id: string | number;
  name: string;
  explain?: string;
  image?: string;
  icon?: string;
  logo?: ProjectLogo;
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
  period: string;
  path: string;
  description: string;
  projects: Project[];
}

export interface StackCategory {
  id: number;
  label: string;
  items: string[];
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

export interface GalleryPhoto {
  id: string;
  name: string;
  src: string;
}

export interface HomeContent {
  about: {
    heading: string;
    introduction: string;
    companyId: number;
    projectsIntroduction: string;
    projectIds: string[];
    closing: string;
    personal: string;
  };
  experience: { heading: string };
  projects: { heading: string; ids: string[]; moreLabel: string };
  blog: { heading: string; limit: number; moreLabel: string };
  contact: { heading: string; introduction: string; emailLabel: string };
}

export interface Settings {
  routes: { home: string; works: string; write: string; rss: string };
  name: string;
  slug: string;
  title: string;
  github?: string;
  keywords: string[];
  hiring: boolean;
  resume: string;
  url: string;
  about: string;
  /** Altbilgide ve OG kartında görünen tek satırlık tanım. */
  tagline: string;
  /** Şehir/ülke — künyede ve OG kartında kullanılıyor. */
  location: string;
  currentCompany?: string;
  image: string;
  nav: NavigationItem[];
  social: SocialLink[];
  experience: Experience[];
  work: Project[];
  projects: Record<string, Project>;
  gallery: GalleryPhoto[];
  home: HomeContent;
  stack: StackCategory[];
  pages: {
    write: PageSettings;
    works: PageSettings;
    projects: PageSettings;
    stack: PageSettings;
  };
  seo: SeoSettings;
  analytics: AnalyticsSettings;
  blog: BlogSettings;
}
