"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const technologies = [
  // AI & Machine Learning
  'OpenAI API', 'GPT-4', 'Hugging Face', 'ONNX Runtime', 'Natural Language Processing',
  'Text Analysis', 'Machine Learning', 'AI Integration', 'Sentiment Analysis',
  'Text Classification', 'AI Chatbots', 'Neural Networks', 'Deep Learning',
  'TensorFlow', 'PyTorch', 'Transformers', 'BERT', 'GPT Models',
  
  // Game Development
  'DragonRuby', 'Ruby', 'Game Development', 'Canvas API', 'WebGL',
  'Physics Engines', 'Sprite Animation', 'Game Design', 'Game Mechanics',
  'Level Design', 'Sound Design', '2D Graphics', 'Game Architecture',
  
  // Frontend
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
  'Tailwind CSS', 'Material-UI', 'Framer Motion', 'Redux', 'Context API',
  'Web Audio API', 'React Query', 'SWR', 'React Router', 'Styled Components',
  'CSS Modules', 'Web Components', 'Progressive Enhancement',
  
  // Backend
  'Node.js', 'Express', 'MongoDB', 'Mongoose', 'RESTful APIs', 'GraphQL',
  'Python', 'Django', 'FastAPI', 'Flask', 'SQLAlchemy', 'PostgreSQL',
  'WebSockets', 'Socket.io', 'JWT Authentication', 'OAuth2', 'Redis',
  'API Design', 'Microservices', 'Serverless Functions',
  
  // Data & Analytics
  'Data Visualization', 'D3.js', 'Chart.js', 'Plotly', 'Pandas', 'NumPy',
  'Data Analysis', 'Big Data', 'Time Series Analysis', 'Statistical Analysis',
  'Real-time Analytics', 'Business Intelligence', 'Data Mining',
  'Data Pipelines', 'ETL Processes',
  
  // Tools & DevOps
  'Git', 'GitHub', 'VS Code', 'Webpack', 'Vite', 'npm', 'yarn',
  'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure',
  'CI/CD', 'Jenkins', 'GitHub Actions', 'Travis CI', 'Netlify',
  'Vercel', 'Cloudflare', 'Server Deployment',
  
  // Testing & Quality
  'Jest', 'React Testing Library', 'Cypress', 'Selenium',
  'Unit Testing', 'Integration Testing', 'E2E Testing', 'TDD',
  'Test Automation',
  
  // Performance & Security
  'Performance Optimization', 'Web Security', 'OWASP', 'SSL/TLS',
  'Caching', 'CDN', 'Load Balancing', 'Rate Limiting',
  'Security Best Practices', 'Code Quality', 'Accessibility',
  
  // Mobile & PWA
  'Progressive Web Apps', 'Responsive Design', 'Mobile First',
  'Cross-platform Development', 'Native Features', 'Offline Support',
  'Mobile Optimization', 'Touch Interfaces',
  
  // Emerging Tech
  'WebAssembly', 'WebRTC', 'Web Components', 'Microservices',
  'Serverless', 'Edge Computing', 'Blockchain', 'IoT',
  'AR/VR', 'Web3', 'Decentralized Applications'
];

export default function TechScroll() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div 
        className="perspective-1000 w-full max-w-4xl mx-auto relative h-[600px] overflow-hidden"
      >
        <div 
          className="star-wars-text text-center"
          style={{
            transformOrigin: '50% 100%',
            width: '100%',
            whiteSpace: 'pre-line',
            pointerEvents: 'none',
            animationDelay: '0s',
          }}
        >
          {technologies.map((tech, i) => `${tech}${i !== technologies.length - 1 ? '\n' : ''}`).join('')}
        </div>
        
        {/* Gradient overlays for fade-in/fade-out */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-background/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/90 to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
} 