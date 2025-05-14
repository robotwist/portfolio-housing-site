export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    twitter: string;
  };
  features: {
    multiUser: boolean;
    customThemes: boolean;
    projectShowcase: boolean;
    aiChat: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Portfolio Showcase',
  description: 'A modern portfolio showcase platform for developers and creators',
  url: 'https://portfolio-showcase.com',
  ogImage: 'https://portfolio-showcase.com/og.jpg',
  links: {
    github: 'https://github.com/robotwist/portfolio-site',
    twitter: 'https://twitter.com/robotwist',
  },
  features: {
    multiUser: true,
    customThemes: true,
    projectShowcase: true,
    aiChat: true,
  },
}; 