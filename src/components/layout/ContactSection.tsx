"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Social icon SVGs from Header component
  const socials = [
    {
      href: "https://github.com/robotwist",
      label: "GitHub",
      svg: (
        <svg width="34" height="34" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
        </svg>
      ),
      hover: "#3b82f6"
    },
    {
      href: "https://www.linkedin.com/in/robwistrand/",
      label: "LinkedIn",
      svg: (
        <svg width="34" height="34" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z"/>
        </svg>
      ),
      hover: "#22c55e"
    },
    {
      href: "https://twitter.com/roboswish",
      label: "Twitter",
      svg: (
        <svg width="34" height="34" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.93 4.93 0 0 0 2.16-2.72c-.95.56-2 .97-3.13 1.19a4.92 4.92 0 0 0-8.39 4.48c-4.09-.2-7.72-2.17-10.15-5.15a4.93 4.93 0 0 0-.67 2.48c0 1.71.87 3.22 2.19 4.1-.8-.03-1.56-.25-2.22-.62v.06c0 2.39 1.7 4.38 3.95 4.83-.41.11-.84.17-1.29.17-.31 0-.61-.03-.9-.08.61 1.91 2.39 3.3 4.5 3.34a9.87 9.87 0 0 1-6.1 2.1c-.4 0-.79-.02-1.18-.07a13.94 13.94 0 0 0 7.56 2.22c9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63a10.1 10.1 0 0 0 2.46-2.57z"/>
        </svg>
      ),
      hover: "#22d3ee"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="project-card">
        <div className="card-content">
          <h3 className="card-title text-center">Contact Me</h3>
          <p className="card-description" style={{ fontSize: "1.1rem", marginBottom: "1.5rem", textAlign: "center" }}>
            Interested in hiring me for your team? I'm currently available for exciting job opportunities 
            where I can leverage my skills in web development and AI integration.
          </p>
          
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fallback-container"
              style={{ padding: "2rem" }}
            >
              <div className="fallback-emoji" style={{ color: "var(--color-secondary)" }}>
                ✅
              </div>
              <h3 className="card-title" style={{ textAlign: "center" }}>Message Sent!</h3>
              <p className="card-description" style={{ textAlign: "center" }}>
                Thank you for reaching out. I'll get back to you soon about potential opportunities.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
            >
              {status === 'error' && (
                <div className="mb-6 p-4" style={{ 
                  backgroundColor: "rgba(239, 68, 68, 0.1)", 
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: "0.5rem",
                  color: "var(--color-destructive)",
                  fontSize: "0.875rem",
                  textAlign: "center" 
                }}>
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "var(--color-card-hover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.5rem",
                      color: "var(--color-foreground)",
                      outline: "none",
                      transition: "border-color 0.2s ease"
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "var(--color-card-hover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.5rem",
                      color: "var(--color-foreground)",
                      outline: "none",
                      transition: "border-color 0.2s ease"
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "var(--color-card-hover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.5rem",
                      color: "var(--color-foreground)",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      resize: "vertical"
                    }}
                    placeholder="Tell me about the job opportunity or project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem", 
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    fontWeight: "500",
                    cursor: status === 'loading' ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    opacity: status === 'loading' ? "0.7" : "1"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-primary)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </motion.form>
          )}
        </div>
        
        {/* Social Links */}
        <div className="card-footer">
          <p className="card-description" style={{ margin: 0, fontSize: "0.9rem" }}>
            Or connect with me directly:
          </p>
          <div className="card-links">
            {socials.map(({ href, label, svg, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="card-link"
                style={{
                  color: 'var(--color-muted-foreground)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = hover as string;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'var(--color-muted-foreground)';
                }}
              >
                {svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 