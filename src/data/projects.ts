import { Project } from "@/types/project";

export const projects: Project[] = [
  // LEAD PROJECTS - Career-relevant, strongest work
  {
    id: "unforgiving-minute",
    title: "Unforgiving Minute",
    description: "A running training platform with a pace calculator based on current race times. Built with React and TypeScript, it helps runners determine appropriate training paces. Features responsive design and clean user interface. This project combines my interest in running with web development.",
    technologies: ["React", "TypeScript", "Node.js", "Training Algorithms"],
    imageUrl: "/images/UnforgivingMinute.png",
    githubUrl: "https://github.com/robotwist/unforgiving-minute",
    liveUrl: "https://unforgivingminute.netlify.app/",
    upvotes: 6
  },
  {
    id: "authentic-reader",
    title: "Authentic Reader",
    description: "A content analysis tool that processes social media data to help identify patterns and potential bias. Built with Python and Flask for the backend, React for the frontend. Features data visualization and filtering capabilities. This project explores data processing and visualization techniques.",
    technologies: ["Python", "Flask", "React", "AWS"],
    imageUrl: "/images/authentic-reader-screenshot.png",
    videoUrl: "/videos/authentic-reader.mp4",
    githubUrl: "https://github.com/robotwist/authentic-reader",
    liveUrl: "https://authentic-reader.netlify.app/",
    upvotes: 15
  },
  {
    id: "authentic-internet",
    title: "Authentic Internet Game",
    description: "An interactive web application for exploring social media data patterns. Built with Next.js and React, it features data visualizations and network analysis tools. The project demonstrates frontend development skills and data presentation techniques.",
    technologies: ["Next.js", "React", "CSS"],
    imageUrl: "/images/authentic-internet.png",
    githubUrl: "https://github.com/robotwist/authentic-internet",
    liveUrl: "https://flourishing-starburst-8cf88b.netlify.app/",
    upvotes: 17
  },
  {
    id: "virgil-ai",
    title: "Virgil AI Assistant",
    description: "A chatbot interface built with Next.js and TypeScript. Features conversation memory and a clean user interface. This project explores AI integration and modern web development practices.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    imageUrl: "/images/virgil-ai.png",
    videoUrl: "/videos/virgil-ai.mp4",
    githubUrl: "https://github.com/robotwist/virgil-ai-assistant",
    liveUrl: "https://virgil-ai-assistant.netlify.app/",
    upvotes: 0
  },
  
  // ADDITIONAL INTERACTIVE PROJECTS
  {
    id: "deeply-trivial",
    title: "Deeply Trivial",
    description: "A trivia game with dynamic difficulty adjustment. Built with React and TypeScript, it features responsive design and progressive difficulty scaling. The project demonstrates game development concepts and state management.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    imageUrl: "/images/Deeply Trivial.png",
    githubUrl: "https://github.com/robotwist/deeply-trivial",
    liveUrl: "https://stacking-trivia-five-deep.netlify.app/",
    upvotes: 8
  },
  {
    id: "evolving-machine",
    title: "Evolving the Machine",
    description: "A game exploring AI evolution through video game history. Built with React and TypeScript, it features interactive storytelling and evolutionary algorithms. This project combines game development with AI concepts.",
    technologies: ["React", "TypeScript", "Game Development", "Evolutionary Algorithms"],
    imageUrl: "/images/EvolveTM.png",
    githubUrl: "https://github.com/robotwist/evolving-machine",
    liveUrl: "https://evolving-the-machine.netlify.app/",
    upvotes: 12
  },
  
  // CHROME EXTENSIONS - Practical tools
  {
    id: "facebook-friends-only",
    title: "Facebook Friends Only Mode",
    description: "A Chrome extension that simplifies Facebook's interface to show only friends' posts. Built with JavaScript and CSS, it removes ads and distractions. Features clean interface design and DOM manipulation techniques.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/facebook-friends-only.png",
    githubUrl: "https://github.com/robotwist/facebook-friends-only",
    liveUrl: "https://chromewebstore.google.com/detail/lemgnohfbnoclnblnhiadeabkmjbbilj",
    upvotes: 0
  },
  {
    id: "instagone",
    title: "Instagone",
    description: "A Chrome extension that helps reduce Instagram distractions by removing certain features. Built with JavaScript and CSS, it demonstrates browser extension development and user experience design.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/instagone.png",
    githubUrl: "https://github.com/robotwist/instagone",
    liveUrl: "https://chromewebstore.google.com/detail/cfkohckelcbibalhhmgjllhfibkbeknl",
    upvotes: 0
  },
  {
    id: "linkedin-jobs-only",
    title: "LinkedIn Jobs Only Mode",
    description: "A Chrome extension that filters LinkedIn for focused job searching. Built with JavaScript and CSS, it removes feed distractions and focuses on job listings. Features clean interface design.",
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
    description: "A fun Chrome extension that adds a playful animation to web pages. Built with JavaScript and CSS, it features smooth animations and creative problem-solving. This project demonstrates JavaScript animation skills.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/summon-nkd-man.png",
    videoUrl: "/videos/summon-nkd-man.mp4",
    githubUrl: "https://github.com/robotwist/summon-nkd-man",
    liveUrl: "https://chromewebstore.google.com/detail/penadbpfpdlcikkahaniobpnoikgjfoh",
    upvotes: 0
  },
  
  // OTHER FUN EXPERIMENTS
  {
    id: "100m-dash",
    title: "100 Meter Dash",
    description: "A simple keyboard-based game inspired by old school olympics games. Built with JavaScript and HTML Canvas, it features responsive animations and competitive gameplay. This project demonstrates front-end development skills.",
    technologies: ["JavaScript", "HTML Canvas", "CSS"],
    imageUrl: "/images/100-meter-dash.jpg",
    githubUrl: "https://github.com/robotwist/100-meter-dash",
    liveUrl: "https://robotwist.github.io/100-meter-dash/",
    upvotes: 7
  },
  {
    id: "coin-flip",
    title: "Coin Flip Game",
    description: "A simple coin flipping game with Firebase leaderboards. Built with JavaScript and Firebase, it features smooth animations and competitive gameplay. This project demonstrates Firebase integration and modern web development.",
    technologies: ["JavaScript", "HTML", "CSS", "Firebase"],
    imageUrl: "/images/Coin-Flip.png",
    githubUrl: "https://github.com/robotwist/Coin-Flip-Game-Project-One-GA",
    liveUrl: "https://robotwist.github.io/Coin-Flip-Game-Project-One-GA/",
    upvotes: 5
  },
  {
    id: "ledgerline",
    title: "LedgerLine",
    description: "A basic accounting platform built with React and Node.js. Features financial tracking and responsive dashboard design. This project demonstrates full-stack development skills and business application design.",
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
    description: "An admin dashboard for data visualization built with React and TypeScript. Features interactive charts using D3.js and Material UI components. This project demonstrates data visualization and dashboard development skills.",
    technologies: ["React", "TypeScript", "Material UI", "D3.js", "Redux"],
    imageUrl: "/images/authentic-dashboard.png",
    videoUrl: "/videos/authentic-dashboard.mp4",
    githubUrl: "https://github.com/robotwist/authentic-dashboard",
    upvotes: 9
  }
]; 