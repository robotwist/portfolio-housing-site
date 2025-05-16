"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaHeart, FaPlay } from 'react-icons/fa';
import type { Project } from './ProjectsSection';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/project-card.css';

interface ProjectCardProps {
  project: Project;
  index: number;
  onUpvote: (id: string) => void;
}

export default function ProjectCard({ project, index, onUpvote }: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.videoUrl) {
      videoRef.current.play().catch(error => {
        console.error("Video playback error:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && project.videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onUpvote(project.id);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="media-container">
        {project.videoUrl && isHovered ? (
          <video
            ref={videoRef}
            className="project-video"
            src={project.videoUrl}
            muted
            loop
            playsInline
          />
        ) : (
          <>
            {!imageError ? (
              // Next.js Image with proper styling
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                  onError={handleImageError}
                />
              </div>
            ) : (
              <div className="fallback-container">
                <div className="fallback-emoji">🖼️</div>
                <p className="fallback-text">{project.title}</p>
              </div>
            )}
          </>
        )}
        
        {/* Video indicator */}
        {project.videoUrl && (
          <div className="video-indicator" style={{ opacity: isHovered ? 0 : 1 }}>
            <FaPlay style={{ color: 'white', fontSize: '0.75rem' }} />
          </div>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="card-title text-gradient">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        
        <div className="tech-tags">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="more-tag">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        
        <div className="card-footer">
          <div className="card-links">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              prefetch={false}
            >
              <FaGithub />
              <span>GitHub</span>
            </Link>
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              prefetch={false}
            >
              <FaExternalLinkAlt />
              <span>Demo</span>
            </Link>
          </div>
          
          <button
            onClick={handleLike}
            className={`upvote-button ${isLiked ? 'upvote-active' : ''}`}
          >
            <FaHeart />
            <span>{project.upvotes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
} 