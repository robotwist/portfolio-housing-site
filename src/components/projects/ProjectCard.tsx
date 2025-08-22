"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaHeart, FaPlay } from 'react-icons/fa';
import type { Project } from '@/types/project';
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
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  const [showDemoPopup, setShowDemoPopup] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = () => {
    if (!isClient) return;
    setIsHovered(true);
    if (videoRef.current && project.videoUrl) {
      videoRef.current.play().catch(error => {
        console.error("Video playback error:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isClient) return;
    setIsHovered(false);
    if (videoRef.current && project.videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTouchStart = () => {
    if (!isClient) return;
    setIsHovered(true);
    if (videoRef.current && project.videoUrl) {
      videoRef.current.play().catch(error => {
        console.error("Video playback error:", error);
      });
    }
  };

  const handleTouchEnd = () => {
    if (!isClient) return;
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

  const handleDemoClick = () => {
    if (project.liveUrl && project.liveUrl.trim() !== '') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowDemoPopup(true);
    }
  };

  // Helper to scroll to contact section
  const handleContactRedirect = () => {
    setShowDemoPopup(false);
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#contact';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div 
        className="media-container"
        role="presentation"
        aria-hidden="true"
      >
        {isClient && project.videoUrl && isHovered ? (
          <video
            ref={videoRef}
            className="project-video"
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.imageUrl}
            aria-hidden="true"
          >
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            {!imageError ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} project screenshot`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding={index < 3 ? "sync" : "async"}
                  onError={handleImageError}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            ) : (
              <div className="fallback-container" role="img" aria-label={`${project.title} project image`}>
                <div className="fallback-emoji">🖼️</div>
                <p className="fallback-text">{project.title}</p>
              </div>
            )}
          </>
        )}
        
        {project.videoUrl && (
          <div 
            className="video-indicator" 
            style={{ opacity: isHovered ? 0 : 1 }}
            role="img"
            aria-label="Video available"
          >
            <FaPlay style={{ color: 'white', fontSize: '0.75rem' }} />
          </div>
        )}
      </div>
      
      <div className="card-content">
        <h3 
          id={`project-title-${project.id}`}
          className="card-title text-gradient"
        >
          {project.title}
        </h3>
        <p className="card-description">{project.description}</p>
        
        <div 
          className="tech-tags"
          role="list"
          aria-label="Technologies used"
        >
          {project.technologies.slice(0, 4).map((tech) => (
            <span 
              key={tech} 
              className="tech-tag"
              role="listitem"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span 
              className="more-tag"
              role="listitem"
            >
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        
        <div className="card-footer">
          <div 
            className="card-links"
            role="navigation"
            aria-label="Project links"
          >
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              prefetch={false}
              aria-label={`View ${project.title} on GitHub`}
            >
              <FaGithub />
              <span>GitHub</span>
            </Link>
            <button
              className="card-link"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              aria-label={`Open ${project.title} live link`}
              onClick={handleDemoClick}
              type="button"
            >
              <FaExternalLinkAlt />
              <span>Live Link</span>
            </button>
          </div>
          
          <button
            onClick={handleLike}
            className={`upvote-button ${isLiked ? 'upvote-active' : ''}`}
            aria-label={`Like ${project.title}`}
            aria-pressed={isLiked}
          >
            <FaHeart />
            <span>{project.upvotes}</span>
          </button>
        </div>
      </div>

      {/* Demo Popup Modal */}
      {showDemoPopup && (
        <div
          className="project-demo-modal"
          onClick={() => setShowDemoPopup(false)}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            className="project-card"
            style={{
              maxWidth: "300px",
              width: "90vw",
              padding: "1.25rem 1rem",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              cursor: "auto",
              maxHeight: "290px",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="card-title" style={{ marginBottom: "0.75rem", fontSize: "1.1rem" }}>Request a Demo Video</h3>
            <p className="card-description" style={{ marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              Please scroll down to my contact form below to request a demo video for this project!
            </p>
            <button
              className="btn"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.4rem 1.2rem",
                fontSize: "0.95rem",
                cursor: "pointer",
                marginBottom: "0.5rem"
              }}
              onClick={handleContactRedirect}
              type="button"
            >
              Click and Scroll to Contact Me
            </button>
            <div style={{ marginTop: "0.5rem" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--color-muted-foreground)" }}>
                Also, connect via socials below!
              </span>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
} 