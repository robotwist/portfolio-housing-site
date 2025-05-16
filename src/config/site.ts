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
  name: 'Rob Wistrand - Portfolio',
  description: 'Full Stack Developer & AI Enthusiast - Building modern, authentic web experiences',
  url: 'https://robwistrand.com',
  ogImage: '/images/Authentic-Internet-Whale.png',
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