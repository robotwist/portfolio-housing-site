"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header({ toggleChat }: { toggleChat?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Social icon SVGs
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

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '#projects' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        width: '100%',
        background: 'linear-gradient(to right, #0d1117, #161b22 80%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        borderBottom: '1px solid #30363d',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '102px',
          padding: '0 2rem',
        }}
      >
        {/* Logo and Brand */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
          <img
            src="/images/TruthRayLogo.png"
            alt="TruthRay Logo"
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              border: '2px solid #222',
              background: '#fff',
              display: 'block',
            }}
            draggable={false}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: '1.5rem',
              background: 'linear-gradient(to right, #3b82f6, #22d3ee, #22c55e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '0.02em',
            }}
          >
            Rob Wistrand
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {navLinks.map(link => (
            <li key={link.name}>
              <Link href={link.href} style={{
                color: '#e6edf3',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Socials */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          {socials.map(({ href, label, svg, hover }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color: '#8b949e',
                fontSize: '1.5rem',
                transition: 'color 0.2s',
                textDecoration: 'none',
              }}
              onMouseOver={e => (e.currentTarget.style.color = hover)}
              onMouseOut={e => (e.currentTarget.style.color = '#8b949e')}
            >
              {svg}
            </a>
          ))}
          
          {toggleChat && (
            <button
              onClick={toggleChat}
              aria-label="Open chat"
              style={{
                color: '#8b949e',
                fontSize: '1.5rem',
                transition: 'color 0.2s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#22d3ee')}
              onMouseOut={e => (e.currentTarget.style.color = '#8b949e')}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
              </svg>
            </button>
          )}
        </div>

        {/* Hamburger for mobile */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(v => !v)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '44px',
            height: '44px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 100,
          }}
          className="hamburger"
        >
          <span
            style={{
              display: 'block',
              width: '28px',
              height: '3px',
              background: '#e6edf3',
              borderRadius: '2px',
              transition: '0.3s',
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              marginBottom: '6px',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '28px',
              height: '3px',
              background: '#e6edf3',
              borderRadius: '2px',
              transition: '0.3s',
              opacity: mobileOpen ? 0 : 1,
              marginBottom: '6px',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '28px',
              height: '3px',
              background: '#e6edf3',
              borderRadius: '2px',
              transition: '0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(13,17,23,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99,
            transition: 'background 0.3s',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
          }}>
            {navLinks.map(link => (
              <li key={link.name}>
                <Link href={link.href} style={{
                  color: '#e6edf3',
                  fontSize: '2rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            {socials.map(({ href, label, svg, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: '#8b949e',
                  fontSize: '2.2rem',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseOver={e => (e.currentTarget.style.color = hover)}
                onMouseOut={e => (e.currentTarget.style.color = '#8b949e')}
              >
                {svg}
              </a>
            ))}
            
            {toggleChat && (
              <button
                onClick={e => {
                  e.stopPropagation(); // Prevent closing the menu
                  toggleChat();
                  setMobileOpen(false); // Close menu after toggling chat
                }}
                aria-label="Open chat"
                style={{
                  color: '#8b949e',
                  fontSize: '2.2rem',
                  transition: 'color 0.2s',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                onMouseOver={e => (e.currentTarget.style.color = '#22d3ee')}
                onMouseOut={e => (e.currentTarget.style.color = '#8b949e')}
              >
                <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
        }
        @media (min-width: 901px) {
          .hamburger {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
} 