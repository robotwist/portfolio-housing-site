"use client";

import { useEffect, useRef } from 'react';
import '@/styles/tech-scroll.css';

// Restored full list of technologies
const technologies = [
  // AI & Machine Learning
  'OpenAI API', 'GPT-4', 'Hugging Face', 'ONNX Runtime', 'Natural Language Processing',
  'Text Analysis', 'Machine Learning', 'AI Integration', 'Sentiment Analysis',
  'Text Classification', 'AI Chatbots', 'Neural Networks', 'Deep Learning',
  'TensorFlow', 'PyTorch', 'Transformers', 'BERT', 'GPT Models',
  
  // Frontend frameworks and libraries
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
  'Tailwind CSS', 'Material-UI', 'Framer Motion', 'Redux', 'Context API',
  'Web Audio API', 'React Query', 'SWR', 'React Router', 'Styled Components',
  
  // Game Development
  'DragonRuby', 'Ruby', 'Game Development', 'Canvas API', 'WebGL',
  'Physics Engines', 'Sprite Animation', 'Game Design', 'Game Mechanics',
  
  // Backend
  'Node.js', 'Express', 'MongoDB', 'Mongoose', 'RESTful APIs', 'GraphQL',
  'Python', 'Django', 'FastAPI', 'PostgreSQL', 'WebSockets', 'Socket.io', 
  
  // Tools & DevOps
  'Git', 'GitHub', 'VS Code', 'Docker', 'AWS', 'Google Cloud',
  'CI/CD', 'GitHub Actions', 'Netlify', 'Vercel', 'Cloudflare',
  
  // Testing & Performance
  'Jest', 'React Testing Library', 'Cypress', 'Performance Optimization', 
  'Web Security', 'Accessibility', 'PWA', 'Responsive Design'
];

// Ensure scrolling with four copies - better chance to see entire list even with varying speeds
const continuousTechnologies = [...technologies, ...technologies, ...technologies, ...technologies];

/**
 * TechScroll Component 
 * 
 * Creates a Star Wars style crawl effect for technologies.
 * Uses pure CSS classes for animation and styling.
 */
export default function TechScroll() {
  // Reference to the container to allow manual animation reset if needed
  const scrollContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Calculate animation duration based on the number of technologies
    // Base speed of 25s (for smaller lists) with dynamic adjustment for larger lists
    // The formula ensures the animation duration scales with the list size
    const duration = Math.max(25, Math.ceil(technologies.length * 0.35));
    
    // Calculate style values based on list length to ensure all items show
    const scrollDistance = `${Math.min(2000, Math.max(1200, technologies.length * 20))}%`;
    
    // Force animation to be visible immediately with calculated values
    if (scrollContentRef.current) {
      // Apply a tiny delay to ensure initial render completes
      setTimeout(() => {
        if (scrollContentRef.current) {
          // Create a custom animation that adapts to the technology count
          const style = document.createElement('style');
          style.textContent = `
            @keyframes dynamicScroll {
              0% {
                transform: rotateX(25deg) translateY(30vh) scale(0.95);
              }
              100% {
                transform: rotateX(25deg) translateY(-${scrollDistance}) scale(1.05);
              }
            }
          `;
          document.head.appendChild(style);
          
          // Force a repaint
          scrollContentRef.current.style.animation = 'none';
          void scrollContentRef.current.offsetHeight; // Trigger reflow
          scrollContentRef.current.style.animation = `dynamicScroll ${duration}s linear infinite`;
        }
      }, 10);
    }
    
    // Cleanup function to remove dynamic style when component unmounts
    return () => {
      const dynamicStyles = document.querySelectorAll('style');
      dynamicStyles.forEach(style => {
        if (style.textContent?.includes('dynamicScroll')) {
          document.head.removeChild(style);
        }
      });
    };
  }, []);

  return (
    <div className="tech-scroll-wrapper">
      <div className="tech-scroll-container">
        <div className="tech-scroll-content" ref={scrollContentRef}>
          <div className="tech-scroll-text">
            {continuousTechnologies.map((tech, i) => {
              // Calculate delay based on index - ensures staggered animation
              // Use a faster delay for the first quarter of items, then increasing delays
              // This creates a nice accordion effect while ensuring all items are visible
              const delayMultiplier = i < technologies.length ? 0.03 : 0.05;
              const delay = (i % technologies.length) * delayMultiplier;
              
              return (
                <div 
                  key={i} 
                  className="tech-item"
                  style={{ 
                    animationDelay: `${delay}s`,
                    // Add subtle random offsets for more organic feel
                    transform: i % 2 === 0 ? 'translateX(-5px)' : 'translateX(5px)'
                  }}
                >
                  {tech}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Gradient overlays */}
        <div className="gradient-overlay-top"></div>
        <div className="gradient-overlay-bottom"></div>
      </div>
    </div>
  );
}