import { Project } from "@/types/project";

export const projects: Project[] = [
  // LEAD PROJECTS - Career-relevant, strongest work
  {
    id: "unforgiving-minute",
    title: "Unforgiving Minute",
    description: "A running training and coaching platform with a dynamic GoldenPace Calculator used by elite athletes worldwide. Built with responsive design, real-time calculations, and user-focused interfaces to help athletes optimize training and track performance.",
    technologies: ["React", "TypeScript", "Node.js", "Training Algorithms", "Athletic Analytics"],
    imageUrl: "/images/UnforgivingMinute.png",
    githubUrl: "https://github.com/robotwist/unforgiving-minute",
    liveUrl: "https://unforgivingminute.netlify.app/",
    upvotes: 6
  },
  {
    id: "authentic-reader",
    title: "Authentic Reader",
    description: "An AI-powered content analysis tool that processes large social media datasets to detect bias and manipulate networks in real-time. Includes scalable ML pipelines and actionable data design.",
    technologies: ["Python", "Flask", "TensorFlow", "React", "AWS"],
    imageUrl: "/images/authentic-reader-screenshot.png",
    videoUrl: "/videos/authentic-reader.mp4",
    githubUrl: "https://github.com/robotwist/authentic-reader",
    liveUrl: "https://authentic-reader.netlify.app/",
    upvotes: 15
  },
  {
    id: "authentic-dashboard",
    title: "Authentic Dashboard",
    description: "Admin dashboard for the Authentic Reader platform with interactive visualizations and real-time data processing. Demonstrates expertise in AI, backend processing, and dashboard interfaces.",
    technologies: ["React", "TypeScript", "Material UI", "D3.js", "Redux"],
    imageUrl: "/images/authentic-dashboard.png",
    videoUrl: "/videos/authentic-dashboard.mp4",
    githubUrl: "https://github.com/robotwist/authentic-dashboard",
    liveUrl: "https://authentic-dashboard.netlify.app/",
    upvotes: 9
  },
  {
    id: "authentic-internet",
    title: "Authentic Internet Game",
    description: "Full-stack project that processes large social media datasets with interactive visualizations. Demonstrates expertise in AI, backend processing, and actionable data design.",
    technologies: ["Next.js", "React", "CSS"],
    imageUrl: "/images/authentic-internet.png",
    githubUrl: "https://github.com/robotwist/authentic-internet",
    liveUrl: "https://flourishing-starburst-8cf88b.netlify.app/",
    upvotes: 17
  },
  {
    id: "virgil-ai",
    title: "Virgil AI Assistant",
    description: "An AI-powered assistant that helps users with various tasks through natural language interaction, showcasing AI integration and user experience design.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI/ML"],
    imageUrl: "/images/virgil-ai.png",
    videoUrl: "/videos/virgil-ai.mp4",
    githubUrl: "https://github.com/robotwist/virgil-ai-assistant",
    liveUrl: "https://virgil-ai-assistant.netlify.app/",
    upvotes: 0
  },
  
  // CHROME EXTENSIONS - Practical tools shipped to real users
  {
    id: "facebook-friends-only",
    title: "Facebook Friends Only Mode",
    description: "A Chrome extension that simplifies Facebook UI to only show posts from friends and family, removing ads, suggested posts, and other distractions. Shipped to real users with clean, intuitive interfaces.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/facebook-friends-only.png",
    githubUrl: "https://github.com/robotwist/facebook-friends-only",
    liveUrl: "https://chromewebstore.google.com/detail/lemgnohfbnoclnblnhiadeabkmjbbilj",
    upvotes: 0
  },
  {
    id: "instagone",
    title: "Instagone",
    description: "A Chrome extension that helps you reclaim your time and attention by removing Reels, Explore, and other distractions from Instagram mobile web. Demonstrates functional reliability and user-focused design.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/instagone.png",
    githubUrl: "https://github.com/robotwist/instagone",
    liveUrl: "https://chromewebstore.google.com/detail/cfkohckelcbibalhhmgjllhfibkbeknl",
    upvotes: 0
  },
  {
    id: "linkedin-jobs-only",
    title: "LinkedIn Jobs Only Mode",
    description: "A Chrome extension that filters LinkedIn to show only job-related content, removing the feed, messages, and notifications for a focused job search experience.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/linkedin-jobs-only.jpg",
    videoUrl: "/videos/linkedin-jobs-only.mp4",
    githubUrl: "https://github.com/robotwist/linkedin-jobs-only",
    liveUrl: "https://chromewebstore.google.com/detail/eojclkjofepnlmopjcpmblbkjmipipcn",
    upvotes: 0
  },
  {
    id: "summon-nkd-man",
    title: "Summon NK D Man",
    description: "A fun Chrome extension that unleashes NK D Man onto any webpage with a four-act streaking prank animation. Showcases creative problem-solving and playful design.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/summon-nkd-man.png",
    videoUrl: "/videos/summon-nkd-man.mp4",
    githubUrl: "https://github.com/robotwist/summon-nkd-man",
    liveUrl: "https://chromewebstore.google.com/detail/penadbpfpdlcikkahaniobpnoikgjfoh",
    upvotes: 0
  },
  
  // ADDITIONAL INTERACTIVE PROJECTS
  {
    id: "deeply-trivial",
    title: "Deeply Trivial",
    description: "AI-powered trivia game with dynamic difficulty scaling, showcasing algorithmic thinking and responsive front-end design.",
    technologies: ["React", "TypeScript", "AI/ML", "Node.js", "MongoDB"],
    imageUrl: "/images/Deeply Trivial.png",
    githubUrl: "https://github.com/robotwist/deeply-trivial",
    liveUrl: "https://stacking-trivia-five-deep.netlify.app/",
    upvotes: 8
  },
  {
    id: "evolving-machine",
    title: "Evolving the Machine",
    description: "A game exploring AI evolution through the history of video games, demonstrating creative problem-solving, algorithm design, and interactive storytelling.",
    technologies: ["React", "TypeScript", "AI/ML", "Game Development", "Evolutionary Algorithms"],
    imageUrl: "/images/EvolveTM.png",
    githubUrl: "https://github.com/robotwist/evolving-machine",
    liveUrl: "https://evolving-the-machine.netlify.app/",
    upvotes: 12
  },
  
  // OTHER FUN EXPERIMENTS
  {
    id: "100m-dash",
    title: "100 Meter Dash",
    description: "A fun keyboard mashing game inspired by old school olympics games. Highlights experimentation, playful design, and front-end interactivity.",
    technologies: ["JavaScript", "HTML Canvas", "CSS"],
    imageUrl: "/images/100-meter-dash.jpg",
    githubUrl: "https://github.com/robotwist/100-meter-dash",
    liveUrl: "https://robotwist.github.io/100-meter-dash/",
    upvotes: 7
  },
  {
    id: "coin-flip",
    title: "Coin Flip Game",
    description: "A simple yet addictive coin flipping game with leaderboards. Demonstrates experimentation, playful design, and front-end interactivity.",
    technologies: ["JavaScript", "HTML", "CSS", "Firebase"],
    imageUrl: "/images/Coin-Flip.png",
    githubUrl: "https://github.com/robotwist/Coin-Flip-Game-Project-One-GA",
    liveUrl: "https://robotwist.github.io/Coin-Flip-Game-Project-One-GA/",
    upvotes: 5
  },
  {
    id: "ledgerline",
    title: "LedgerLine",
    description: "A modern accounting platform built with React and Node.js. Showcases full-stack development and business application design.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    imageUrl: "/images/Ledgerline-Opening.png",
    videoUrl: "",
    githubUrl: "https://github.com/robotwist/Ledgerline",
    liveUrl: "https://ledgerline-a661b98ef7f7.herokuapp.com/",
    upvotes: 8
  }
]; 