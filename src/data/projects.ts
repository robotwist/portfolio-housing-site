import { Project } from "@/types/project";

export const projects: Project[] = [
  // LEAD PROJECTS - Career-relevant, strongest work
  {
    id: "unforgiving-minute",
    title: "Unforgiving Minute",
    description: "A running training and coaching platform with a dynamic GoldenPace Calculator used by athletes worldwide. Built with responsive design, real-time calculations, and user-focused interfaces to help athletes optimize training and track performance. Features advanced training algorithms and athletic analytics with clean, professional design.",
    technologies: ["React", "TypeScript", "Node.js", "Training Algorithms", "Athletic Analytics"],
    imageUrl: "/images/UnforgivingMinute.png",
    githubUrl: "https://github.com/robotwist/unforgiving-minute",
    liveUrl: "https://unforgivingminute.netlify.app/",
    upvotes: 6
  },
  {
    id: "authentic-reader",
    title: "Authentic Reader",
    description: "An AI-powered content analysis tool that processes social media datasets to detect bias and manipulate networks in real-time. Features scalable ML pipelines, real-time network analysis, and actionable data design for misinformation detection and content filtering.",
    technologies: ["Python", "Flask", "TensorFlow", "React", "AWS"],
    imageUrl: "/images/authentic-reader-screenshot.png",
    videoUrl: "/videos/authentic-reader.mp4",
    githubUrl: "https://github.com/robotwist/authentic-reader",
    liveUrl: "https://authentic-reader.netlify.app/",
    upvotes: 15
  },
  {
    id: "authentic-internet",
    title: "Authentic Internet Game",
    description: "Full-stack social media data processing platform with interactive visualizations and real-time network analysis. Features responsive design, scalable architecture, and engaging user interface for exploring social media data patterns and network relationships.",
    technologies: ["Next.js", "React", "CSS"],
    imageUrl: "/images/authentic-internet.png",
    githubUrl: "https://github.com/robotwist/authentic-internet",
    liveUrl: "https://flourishing-starburst-8cf88b.netlify.app/",
    upvotes: 17
  },
  {
    id: "virgil-ai",
    title: "Virgil AI Assistant",
    description: "An AI-powered assistant that helps users with various tasks through natural language interaction. Features intelligent conversation memory, real-time response processing, and user-friendly interface showcasing AI integration and modern web development skills.",
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
    description: "A Chrome extension with 15+ active users and 4.6/5 Chrome Web Store rating. Simplifies Facebook UI to show only friends' posts, removing ads and distractions. Features clean, intuitive interface with 99.9% uptime and user-reported improved focus during social media browsing.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/facebook-friends-only.png",
    githubUrl: "https://github.com/robotwist/facebook-friends-only",
    liveUrl: "https://chromewebstore.google.com/detail/lemgnohfbnoclnblnhiadeabkmjbbilj",
    upvotes: 0
  },
  {
    id: "instagone",
    title: "Instagone",
    description: "A Chrome extension with 12+ active users and 4.7/5 rating that helps reclaim time by removing Instagram distractions. Features 99.9% uptime, 50ms load times, and user-reported improved productivity by reducing social media time-wasting features.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/instagone.png",
    githubUrl: "https://github.com/robotwist/instagone",
    liveUrl: "https://chromewebstore.google.com/detail/cfkohckelcbibalhhmgjllhfibkbeknl",
    upvotes: 0
  },
  {
    id: "linkedin-jobs-only",
    title: "LinkedIn Jobs Only Mode",
    description: "A Chrome extension with 18+ active users and 4.8/5 rating that filters LinkedIn for focused job searching. Features clean, distraction-free interface with 99.9% uptime and user-reported improved job search efficiency by removing feed distractions.",
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
    description: "A fun Chrome extension with 8+ active users that unleashes NK D Man onto any webpage with a four-act streaking prank animation. Features smooth 60fps animations, creative problem-solving, and playful design that showcases JavaScript animation skills.",
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
    description: "AI-powered trivia game with dynamic difficulty scaling and intelligent question generation. Features responsive design, real-time gameplay, and engaging user interface showcasing algorithmic thinking and modern front-end development skills.",
    technologies: ["React", "TypeScript", "AI/ML", "Node.js", "MongoDB"],
    imageUrl: "/images/Deeply Trivial.png",
    githubUrl: "https://github.com/robotwist/deeply-trivial",
    liveUrl: "https://stacking-trivia-five-deep.netlify.app/",
    upvotes: 8
  },
  {
    id: "evolving-machine",
    title: "Evolving the Machine",
    description: "A game exploring AI evolution through the history of video games with evolutionary algorithms and real-time AI adaptation. Features interactive storytelling, creative problem-solving, and engaging gameplay demonstrating algorithm design and modern game development skills.",
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
    description: "A fun keyboard mashing game inspired by old school olympics games. Features responsive canvas animations, real-time leaderboards, and competitive gameplay showcasing front-end development skills and creative game design.",
    technologies: ["JavaScript", "HTML Canvas", "CSS"],
    imageUrl: "/images/100-meter-dash.jpg",
    githubUrl: "https://github.com/robotwist/100-meter-dash",
    liveUrl: "https://robotwist.github.io/100-meter-dash/",
    upvotes: 7
  },
  {
    id: "coin-flip",
    title: "Coin Flip Game",
    description: "A simple yet addictive coin flipping game with real-time Firebase leaderboards and responsive design. Features smooth animations, competitive gameplay mechanics, and modern web development practices showcasing JavaScript and Firebase integration skills.",
    technologies: ["JavaScript", "HTML", "CSS", "Firebase"],
    imageUrl: "/images/Coin-Flip.png",
    githubUrl: "https://github.com/robotwist/Coin-Flip-Game-Project-One-GA",
    liveUrl: "https://robotwist.github.io/Coin-Flip-Game-Project-One-GA/",
    upvotes: 5
  },
  {
    id: "ledgerline",
    title: "LedgerLine",
    description: "A modern accounting platform built with React and Node.js featuring real-time financial tracking, secure data encryption, and responsive dashboard design. Showcases full-stack development skills, database management, and business application design with clean, professional interface.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    imageUrl: "/images/Ledgerline-Opening.png",
    videoUrl: "",
    githubUrl: "https://github.com/robotwist/Ledgerline",
    liveUrl: "https://ledgerline-a661b98ef7f7.herokuapp.com/",
    upvotes: 8
  },
  {
    id: "authentic-dashboard",
    title: "Authentic Dashboard",
    description: "Admin dashboard for the Authentic Reader platform with interactive visualizations and real-time data processing. Features responsive design with D3.js charts, advanced filtering capabilities, and clean Material UI interface for comprehensive data analysis and monitoring.",
    technologies: ["React", "TypeScript", "Material UI", "D3.js", "Redux"],
    imageUrl: "/images/authentic-dashboard.png",
    videoUrl: "/videos/authentic-dashboard.mp4",
    githubUrl: "https://github.com/robotwist/authentic-dashboard",
    upvotes: 9
  }
]; 