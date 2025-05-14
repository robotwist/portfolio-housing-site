"use client";

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;  // Can be local or external URL
  videoUrl: string;
  githubUrl: string;
  liveUrl: string;
  upvotes: number;
  userId?: string;  // For multi-user support
  createdAt?: Date;
  updatedAt?: Date;
}

// User configuration
interface UserConfig {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
}

// Example user configuration
const DEFAULT_USER_CONFIG: UserConfig = {
  id: 'robwistrand',
  name: 'Rob Wistrand',
  title: 'Full Stack Developer & AI Enthusiast',
  bio: 'Building modern, authentic web experiences with a passion for beautiful design and seamless UX.',
  avatarUrl: 'https://avatars.githubusercontent.com/robotwist',
  socialLinks: {
    github: 'https://github.com/robotwist',
    linkedin: 'https://www.linkedin.com/in/robwistrand/',
    twitter: 'https://twitter.com/robotwist',
  }
};

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Multi-Level Game Platform',
    description: 'A full-stack MERN application featuring multiple game levels, sound effects, and text-based games. Implemented user authentication, game state management, and real-time updates.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Web Audio API', 'Socket.io'],
    imageUrl: 'https://i.imgur.com/8JZqXKp.png',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    githubUrl: 'https://github.com/robotwist/game-platform',
    liveUrl: 'https://flourishing-starburst-8cf88b.netlify.app/',
    upvotes: 100,
    userId: DEFAULT_USER_CONFIG.id,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Authentic Reader',
    description: 'An AI-powered reading assistant that helps users understand and analyze text content. Features include text summarization, sentiment analysis, and interactive learning tools.',
    technologies: ['Python', 'Django', 'React', 'OpenAI API', 'NLP', 'PostgreSQL'],
    imageUrl: 'https://i.imgur.com/QZxGXKp.png',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    githubUrl: 'https://github.com/robotwist/authentic-reader',
    liveUrl: 'https://authentic-reader.herokuapp.com',
    upvotes: 85,
    userId: DEFAULT_USER_CONFIG.id,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    title: 'Authentic Dashboard',
    description: 'A comprehensive analytics dashboard for tracking user engagement and content performance. Includes data visualization, real-time metrics, and customizable reporting features.',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
    imageUrl: '/images/placeholder.jpg',
    videoUrl: '/videos/authentic-dashboard.mp4',
    githubUrl: 'https://github.com/robotwist/authentic-dashboard',
    liveUrl: 'https://authentic-dashboard.herokuapp.com',
    upvotes: 75
  },
  {
    id: '4',
    title: '100 Meter Dash',
    description: 'An interactive web-based game where players compete in a 100-meter dash. Features include character selection, timing system, and leaderboard functionality.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API', 'Local Storage'],
    imageUrl: '/images/placeholder.jpg',
    videoUrl: '/videos/100-meter-dash.mp4',
    githubUrl: 'https://github.com/robotwist/100-meter-dash',
    liveUrl: 'https://robotwist.github.io/100-meter-dash/',
    upvotes: 65
  },
  {
    id: '5',
    title: 'Coin Flip Game',
    description: 'A simple yet engaging coin flip game with animations and sound effects. Includes statistics tracking and a clean, responsive user interface.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web Audio API'],
    imageUrl: '/images/placeholder.jpg',
    videoUrl: '/videos/coin-flip.mp4',
    githubUrl: 'https://github.com/robotwist/coin-flip',
    liveUrl: 'https://robotwist.github.io/coin-flip/',
    upvotes: 55
  },
  {
    id: '6',
    title: 'Authentic Internet',
    description: 'A modern web platform focused on digital authenticity, featuring a clean UI, robust backend, and seamless integrations. Includes user authentication, content management, and analytics.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    imageUrl: '/images/placeholder.jpg',
    videoUrl: '',
    githubUrl: 'https://github.com/robotwist/authentic-internet',
    liveUrl: 'https://authentic-internet.example.com',
    upvotes: 50
  },
  {
    id: '7',
    title: 'Portfolio Site',
    description: 'My personal portfolio built with Next.js, featuring project showcases, a custom AI chat, and a modern dark theme.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    imageUrl: '/images/placeholder.jpg',
    videoUrl: '',
    githubUrl: 'https://github.com/robotwist/portfolio-site',
    liveUrl: 'https://robwistrand.com',
    upvotes: 40
  },
  {
    id: '8',
    title: 'Hugging Face Playground',
    description: 'A playground for experimenting with Hugging Face models and ONNX runtime, including text generation, classification, and more.',
    technologies: ['Python', 'Hugging Face', 'ONNX', 'Streamlit'],
    imageUrl: '/images/placeholder.jpg',
    videoUrl: '',
    githubUrl: 'https://github.com/robotwist/huggingface-playground',
    liveUrl: '',
    upvotes: 35
  },
  {
    id: '9',
    title: 'DragonRuby Game',
    description: 'A retro-style game built with the DragonRuby engine and Ruby, featuring pixel art, sound effects, and engaging gameplay.',
    technologies: ['Ruby', 'DragonRuby', 'Game Development'],
    imageUrl: '/images/placeholder.jpg',
    videoUrl: '',
    githubUrl: 'https://github.com/robotwist/dragonruby-game',
    liveUrl: '',
    upvotes: 30
  }
];

// Simulate fetching more projects
const fetchMoreProjects = (page: number): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create new projects based on page number
      const newProjects = INITIAL_PROJECTS.map((project) => ({
        ...project,
        id: `${parseInt(project.id) + page * 6}`,
        title: `${project.title} ${page}`,
        upvotes: Math.floor(Math.random() * 30),
      }));
      resolve(newProjects);
    }, 1000);
  });
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Use intersection observer for infinite scrolling
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Handle upvoting
  const handleUpvote = (id: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, upvotes: project.upvotes + 1 }
          : project
      )
    );
  };

  // Sort projects by upvotes (descending)
  const sortedProjects = [...projects].sort((a, b) => b.upvotes - a.upvotes);

  // Load more projects when the last item is in view
  useEffect(() => {
    if (inView && !loading && hasMore) {
      setLoading(true);
      fetchMoreProjects(page)
        .then((newProjects) => {
          if (newProjects.length === 0) {
            setHasMore(false);
          } else {
            setProjects((prevProjects) => [...prevProjects, ...newProjects]);
            setPage((prevPage) => prevPage + 1);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [inView, loading, hasMore, page]);

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-background via-secondary/60 to-background overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-60 rounded-full blur-sm" />
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-gradient text-center mb-2 drop-shadow-lg">Featured Projects</h2>
          <p className="text-lg text-foreground/70 text-center max-w-2xl mx-auto mb-8">A selection of my favorite work—full stack apps, AI tools, games, and more. Click any card to see the code or try the live demo!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              onUpvote={handleUpvote}
            />
          ))}
          {/* Loading indicator */}
          <div ref={ref} className="col-span-full flex justify-center my-12">
            {loading && (
              <div className="animate-pulse flex space-x-3">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
            )}
            {!hasMore && projects.length > 0 && (
              <p className="text-foreground/50">No more projects to load</p>
            )}
          </div>
        </div>
      </div>
      {/* Section Divider Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-60 rounded-full blur-sm" />
    </section>
  );
} 