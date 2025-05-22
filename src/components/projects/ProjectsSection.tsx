"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';

// Dynamically import ProjectCard with no SSR for better performance
const ProjectCard = dynamic(() => import('./ProjectCard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-800 rounded-lg animate-pulse" />
  ),
});

export default function ProjectsSection() {
  const [projectsData, setProjectsData] = useState<Project[]>(projects);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        // Merge saved projects with static projects to ensure all are displayed
        const mergedProjects = projects.map((project: Project) => {
          const savedProject = parsedProjects.find((p: Project) => p.id === project.id);
          return savedProject || project;
        });
        setProjectsData(mergedProjects);
      } catch (error) {
        console.error('Error parsing saved projects:', error);
      }
    }
  }, []);

  const handleUpvote = (id: string) => {
    if (!isClient) return;
    
    const updatedProjects = projectsData.map(project => 
      project.id === id 
        ? { ...project, upvotes: project.upvotes + 1 } 
        : project
    );
    
    setProjectsData(updatedProjects);
    localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
  };

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-64 bg-gray-800 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

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