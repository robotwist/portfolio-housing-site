"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf } from 'react-icons/fa';

export default function ResumeSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="resume" style={{
      padding: '4rem 0',
      background: 'var(--background)',
      position: 'relative'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="resume-card"
          style={{
            background: 'var(--card-background)',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>
              Professional Resume
            </h2>
            <a
              href="/documents/LogoShotResumeJune11-25.docx.pdf"
              download
              className="download-button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'var(--color-primary)',
                color: 'white',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <FaDownload />
              <span>Download PDF</span>
            </a>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            background: '#f5f5f5',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <iframe
              src="/documents/LogoShotResumeJune11-25.docx.pdf"
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="Resume Preview"
            />
          </div>

          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            color: 'var(--color-muted-foreground)'
          }}>
            <p style={{ fontSize: '0.9rem' }}>
              Click the download button above to get a copy of my full resume
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
