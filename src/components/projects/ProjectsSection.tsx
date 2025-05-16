"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  videoUrl?: string;
  githubUrl: string;
  liveUrl: string;
  upvotes: number;
}

const projects: Project[] = [
  {
    id: 'portfolio-site',
    title: 'Portfolio Site',
    description: 'My personal portfolio site built with Next.js 14 and React.',
    technologies: ['Next.js', 'React', 'CSS', 'Framer Motion'],
    imageUrl: '/images/placeholder.jpg',
    githubUrl: 'https://github.com/username/portfolio',
    liveUrl: 'https://portfolio.dev',
    upvotes: 7
  },
  {
    id: 'ledgerline',
    title: 'LedgerLine',
    description: 'A modern accounting platform built with React and Node.js.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    imageUrl: '/images/Ledgerline-Opening.png',
    videoUrl: '/videos/ledgerline-demo.mp4', 
    githubUrl: 'https://github.com/ledgerline/frontend',
    liveUrl: 'https://ledgerline.io',
    upvotes: 8
  },
  {
    id: 'authentic-reader',
    title: 'Authentic Reader',
    description: 'An AI-powered content analysis tool that helps you identify fake news.',
    technologies: ['Python', 'Flask', 'TensorFlow', 'React', 'AWS'],
    imageUrl: '/images/authentic-reader-screenshot.png',
    videoUrl: '/videos/authentic-demo.mp4',
    githubUrl: 'https://github.com/username/authentic-reader',
    liveUrl: 'https://authentic-reader.vercel.app',
    upvotes: 15
  },
  {
    id: 'coin-flip',
    title: 'Coin Flip Game',
    description: 'A simple yet addictive coin flipping game with leaderboards.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
    imageUrl: '/images/Coin-Flip.png',
    githubUrl: 'https://github.com/robotwist/Coin-Flip-Game-Project-One-GA',
    liveUrl: 'https://robotwist.github.io/Coin-Flip-Game-Project-One-GA/',
    upvotes: 5
  },
  {
    id: '100m-dash',
    title: '100 Meter Dash',
    description: 'A fun keyboard mashing game inspired by old school olympics games.',
    technologies: ['JavaScript', 'HTML Canvas', 'CSS'],
    imageUrl: '/images/100-meter-dash.jpg',
    githubUrl: 'https://github.com/robotwist/100-meter-dash',
    liveUrl: 'https://robotwist.github.io/100-meter-dash/',
    upvotes: 7
  },
  {
    id: 'authentic-dashboard',
    title: 'Authentic Dashboard',
    description: 'An admin dashboard for the Authentic Reader platform.',
    technologies: ['React', 'TypeScript', 'Material UI', 'D3.js', 'Redux'],
    imageUrl: '/images/authentic-dashboard.png',
    githubUrl: 'https://github.com/robotwist/authentic-dashboard',
    liveUrl: 'https://dashboard.authentic-reader.vercel.app',
    upvotes: 9
  }
];

export default function ProjectsSection() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  
  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolio-projects');
    if (storedProjects) {
      setProjectsData(JSON.parse(storedProjects));
    } else {
      setProjectsData(projects);
    }
  }, []);

  const handleUpvote = (id: string) => {
    const updatedProjects = projectsData.map(project => 
      project.id === id 
        ? { ...project, upvotes: project.upvotes + 1 } 
        : project
    );
    
    setProjectsData(updatedProjects);
    localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-gradient text-3xl font-bold">My Projects</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            A selection of my recent work, passion projects, and experiments. Hover over the projects to see demos.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 