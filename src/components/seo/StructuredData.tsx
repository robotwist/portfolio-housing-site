export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rob Wistrand",
    "jobTitle": "Software Developer",
    "description": "Full-stack software developer specializing in AI/ML, React, TypeScript, and product-level design",
    "url": "https://robwistrand.com",
    "sameAs": [
      "https://github.com/robotwist",
      "https://linkedin.com/in/robwistrand"
    ],
    "knowsAbout": [
      "React",
      "TypeScript",
      "JavaScript",
      "Python",
      "Machine Learning",
      "Artificial Intelligence",
      "Next.js",
      "Node.js",
      "Full-Stack Development",
      "Chrome Extensions",
      "Web Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Developer",
      "description": "Full-stack developer with expertise in AI/ML integration and product development"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance/Independent"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "General Assembly"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
