"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '#projects' },
  { name: 'Technologies', href: '#technologies' },
  { name: 'Contact', href: '#contact' },
];

interface HeaderProps {
  toggleChat: () => void;
}

export default function Header({ toggleChat }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-background/80 shadow-lg border-b border-border">
      <nav className="container flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-3 focus-ring">
          <span className="sr-only">Rob Wistrand Home</span>
          <img src="/images/authentic-internet.png" alt="Logo" className="h-10 w-10 rounded-full shadow" />
          <span className="text-2xl font-extrabold tracking-tight text-gradient">Rob Wistrand</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-1 justify-center items-center gap-16">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-lg font-semibold px-4 py-2 rounded transition-colors duration-200 text-foreground/90 hover:text-primary focus-ring"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <div className="hidden md:flex items-center gap-6">
          <a href="https://github.com/robotwist" target="_blank" rel="noopener" aria-label="GitHub" className="text-foreground/70 hover:text-primary focus-ring transition-colors text-xl">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/robwistrand/" target="_blank" rel="noopener" aria-label="LinkedIn" className="text-foreground/70 hover:text-primary focus-ring transition-colors text-xl">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/robotwist" target="_blank" rel="noopener" aria-label="Twitter" className="text-foreground/70 hover:text-primary focus-ring transition-colors text-xl">
            <FaTwitter />
          </a>
          <button
            onClick={toggleChat}
            className="text-foreground/70 hover:text-primary focus-ring transition-colors"
            aria-label="Open chat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
            </svg>
          </button>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center h-12 w-12 rounded focus-ring hover:bg-card-hover transition"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Open navigation menu</span>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 w-full bg-background/95 shadow-lg border-b border-border z-40"
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xl font-semibold px-6 py-3 rounded transition-colors duration-200 text-foreground/90 hover:text-primary focus-ring"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <div className="flex items-center gap-6 mt-4">
                <a href="https://github.com/robotwist" target="_blank" rel="noopener" aria-label="GitHub" className="text-foreground/70 hover:text-primary focus-ring transition-colors text-2xl">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/robwistrand/" target="_blank" rel="noopener" aria-label="LinkedIn" className="text-foreground/70 hover:text-primary focus-ring transition-colors text-2xl">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com/robotwist" target="_blank" rel="noopener" aria-label="Twitter" className="text-foreground/70 hover:text-primary focus-ring transition-colors text-2xl">
                  <FaTwitter />
                </a>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 