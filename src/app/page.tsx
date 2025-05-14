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
    <main className="min-h-screen">
      <Header toggleChat={handleToggleChat} />
      <HeroSection />
      
      {/* Tech Scroll Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="text-gradient">
              Technologies & Skills
            </span>
          </h2>
          {/* Logo */}
          <img
            src="/images/authentic-internet.png"
            alt="Authentic Internet Logo"
            className="w-24 h-24 mb-10 mx-auto rounded-full shadow-lg border-4 border-card-bg bg-card-bg"
            draggable={false}
          />
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
