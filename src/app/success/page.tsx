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
            <div className="card-content" style={{ textAlign: "center", padding: "3rem 2rem" }}>
              <div style={{ 
                fontSize: "4rem", 
                marginBottom: "1.5rem",
                color: "var(--color-secondary)"
              }}>
                ✅
              </div>
              
              <h1 className="card-title" style={{ 
                fontSize: "2rem", 
                marginBottom: "1.5rem" 
              }}>
                Message Received!
              </h1>
              
              <p className="card-description" style={{ 
                fontSize: "1.1rem", 
                marginBottom: "2rem" 
              }}>
                Thank you for reaching out! I've received your message and will get back to you as soon as possible.
              </p>
              
              <Link href="/" style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}>
                Back to Homepage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 