export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  videoUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  upvotes: number;
} 