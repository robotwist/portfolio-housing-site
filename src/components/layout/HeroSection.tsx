"use client";

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] py-16 bg-gradient-to-b from-background via-secondary to-background overflow-hidden">
      {/* Logo */}
      <img
        src="/images/authentic-internet.png"
        alt="Authentic Internet Logo"
        className="w-32 h-32 mb-8 rounded-full shadow-xl border-4 border-card-bg bg-card-bg"
        draggable={false}
      />
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gradient mb-4 drop-shadow-lg">
        Welcome to Rob Wistrand's Portfolio
      </h1>
      {/* Subheadline */}
      <p className="text-lg md:text-2xl text-foreground/80 max-w-2xl mb-8 mx-auto">
        Full Stack Developer & AI Enthusiast. Building modern, authentic web experiences with a passion for beautiful design and seamless UX.
      </p>
      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="#projects"
          className="btn-trello text-lg font-semibold px-8 py-3 shadow-lg focus-ring"
        >
          View My Work
        </Link>
        <Link
          href="#contact"
          className="btn-trello-secondary text-lg font-semibold px-8 py-3 shadow-lg focus-ring"
        >
          Contact Me
        </Link>
      </div>
      {/* Subtle background effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-tr from-primary/10 via-accent/5 to-secondary/10 blur-2xl opacity-70 animate-pulse" />
      </div>
    </section>
  );
} 