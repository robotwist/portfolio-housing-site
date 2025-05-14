"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-24 py-12 bg-card-bg border-t border-border">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/70 text-center md:text-left text-lg">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          <div className="mt-6 md:mt-0 text-md text-foreground/50">
            <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 