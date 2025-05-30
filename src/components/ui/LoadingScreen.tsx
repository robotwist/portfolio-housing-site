"use client";

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after all resources are loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'spin 1s linear infinite',
        }}
      >
        <span style={{ fontSize: '2rem' }}>🚀</span>
      </div>
      <p
        style={{
          marginTop: '2rem',
          color: '#e6edf3',
          fontSize: '1.2rem',
          fontWeight: 500,
        }}
      >
        Loading Portfolio...
      </p>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 