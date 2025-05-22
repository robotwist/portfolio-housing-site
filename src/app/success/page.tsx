"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Success() {
  // Auto-scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ minHeight: '100vh' }}>
      <Header />
      
      <section style={{
        padding: '8rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0d1117'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="project-card"
            style={{ maxWidth: "700px", margin: "0 auto" }}
          >
            <div className="card-content">
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div style={{ 
                  fontSize: "4rem", 
                  marginBottom: "1rem",
                  color: "var(--color-primary)"
                }}>
                  ✅
                </div>
                <h1 style={{ 
                  fontSize: "2rem", 
                  marginBottom: "1rem",
                  color: "var(--color-foreground)"
                }}>
                  Message Sent Successfully!
                </h1>
                <p style={{ 
                  fontSize: "1.1rem",
                  color: "var(--color-muted-foreground)",
                  marginBottom: "2rem"
                }}>
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <Link 
                  href="/"
                  style={{
                    display: "inline-block",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease"
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
                  Return to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 