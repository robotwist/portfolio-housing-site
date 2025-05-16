"use client";

import { useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/layout/HeroSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ContactSection from '@/components/layout/ContactSection';
import AIChat, { AIChatHandle } from '@/components/ui/AIChat';
import TechScroll from '@/components/ui/TechScroll';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef<AIChatHandle>(null);

  const handleToggleChat = () => {
    if (chatRef.current) {
      chatRef.current.toggleChat();
    }
  };

  return (
    <main style={{ minHeight: '100vh' }}>
      <Header toggleChat={handleToggleChat} />
      <HeroSection />
      
      {/* Tech Scroll Section */}
      <section id="technologies" style={{
        padding: '4rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0d1117'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '2.5rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            <span className="text-gradient" style={{padding: '0.5rem 1rem'}}>
              Technologies & Skills
            </span>
          </h2>
          <TechScroll />
        </div>
      </section>

      <ProjectsSection />
      <ContactSection />
      <Footer />
      <AIChat ref={chatRef} />
    </main>
  );
}
