"use client";

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] py-16 bg-gradient-to-b from-background via-secondary to-background overflow-hidden">
      <div className="container text-center">
        {/* Logo */}
        <img
          src="/images/Authentic-Internet-Whale.png"
          alt="Authentic Internet Whale Logo"
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: '2px solid #222',
            background: '#fff',
            display: 'block',
            marginBottom: '1.35rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          draggable={false}
        />
        {/* Headline */}
        <h1 className="gradient-headline text-3xl">
          Welcome to Rob Wistrand's Portfolio
        </h1>
        {/* Subheadline */}
        <p className="text-center" style={{
          fontSize: '1.4rem',
          color: 'rgba(var(--foreground-rgb), 0.8)',
          maxWidth: '43rem',
          marginBottom: '.25rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '2.25'
        }}>
          I'm Rob. Scroll to my projects. Click them. Download the Chrome extensions. They are useful. My games are fun: 100 Meter Mash, mash buttons to see who is the fastest in the galaxy. Authentic Internet houses the best that 8 bit music has to offer with four condensed levels including the delightful Hemingway Text Adventure. Coin Flip is the simplest game on earth featuring a showdown with the most dastardly villain of them all, your mother. I have AI-integrated tools. They focus on network theory, multi-dimensional bias with real-time data filtering and full-stack ML pipelines. I would love to show you a video demo of my AI filtering tools.
        </p>
      </div>
      {/* Subtle background effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top right, rgba(var(--primary-rgb), 0.1), rgba(var(--accent-rgb), 0.05), rgba(var(--secondary-rgb), 0.1))',
          filter: 'blur(40px)',
          opacity: 0.7,
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }} />
      </div>
    </section>
  );
}