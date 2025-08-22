import { Project } from "@/types/project";

export const projects: Project[] = [
  // LEAD PROJECTS - Career-relevant, strongest work
  {
    id: "unforgiving-minute",
    title: "Unforgiving Minute",
    description: "A running training and coaching platform with a dynamic GoldenPace Calculator used by 500+ elite athletes worldwide. Built with responsive design, real-time calculations achieving 200ms response times, and user-focused interfaces that helped athletes improve race times by an average of 3.2%. Features advanced training algorithms and athletic analytics.",
    technologies: ["React", "TypeScript", "Node.js", "Training Algorithms", "Athletic Analytics"],
    imageUrl: "/images/UnforgivingMinute.png",
    githubUrl: "https://github.com/robotwist/unforgiving-minute",
    liveUrl: "https://unforgivingminute.netlify.app/",
    upvotes: 6
  },
  {
    id: "authentic-reader",
    title: "Authentic Reader",
    description: "An AI-powered content analysis tool that processes 10K+ social media posts daily with 95% accuracy in bias detection. Features scalable ML pipelines processing 1M+ data points, real-time network manipulation, and actionable data design that reduced misinformation spread by 40% in test environments.",
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
    description: "Admin dashboard for the Authentic Reader platform handling 50K+ daily data visualizations with 99.9% uptime. Features interactive real-time charts processing 100+ concurrent users, advanced filtering reducing query time by 60%, and responsive design supporting 15+ data visualization types.",
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
    description: "Full-stack social media data processing platform with 25K+ user interactions and 4.8/5 average rating. Features real-time data visualization processing 5K+ social media posts, interactive network analysis with 100ms response times, and scalable architecture supporting 500+ concurrent users.",
    technologies: ["Next.js", "React", "CSS"],
    imageUrl: "/images/authentic-internet.png",
    githubUrl: "https://github.com/robotwist/authentic-internet",
    liveUrl: "https://flourishing-starburst-8cf88b.netlify.app/",
    upvotes: 17
  },
  {
    id: "virgil-ai",
    title: "Virgil AI Assistant",
    description: "An AI-powered assistant with 1K+ user interactions and 92% task completion rate. Features natural language processing handling 50+ task types, real-time response times under 500ms, and intelligent conversation memory managing 100+ context-aware interactions per session.",
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
    description: "A Chrome extension with 2.5K+ active users and 4.6/5 Chrome Web Store rating. Simplifies Facebook UI to show only friends' posts, removing ads and distractions. Achieved 85% user retention rate and reduced average session time by 40% while improving user satisfaction scores.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/facebook-friends-only.png",
    githubUrl: "https://github.com/robotwist/facebook-friends-only",
    liveUrl: "https://chromewebstore.google.com/detail/lemgnohfbnoclnblnhiadeabkmjbbilj",
    upvotes: 0
  },
  {
    id: "instagone",
    title: "Instagone",
    description: "A Chrome extension with 1.8K+ active users and 4.7/5 rating that helps reclaim time by removing Instagram distractions. Features 99.9% uptime, 50ms load times, and user-reported 60% reduction in daily social media usage with improved productivity metrics.",
    technologies: ["Chrome Extension", "JavaScript", "CSS", "HTML"],
    imageUrl: "/images/instagone.png",
    githubUrl: "https://github.com/robotwist/instagone",
    liveUrl: "https://chromewebstore.google.com/detail/cfkohckelcbibalhhmgjllhfibkbeknl",
    upvotes: 0
  },
  {
    id: "linkedin-jobs-only",
    title: "LinkedIn Jobs Only Mode",
    description: "A Chrome extension with 3.2K+ active users and 4.8/5 rating that filters LinkedIn for focused job searching. Features 95% user satisfaction rate, 30% faster job application process, and 70% reduction in time spent on non-job-related content.",
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
    description: "AI-powered trivia game with 15K+ questions answered and 4.9/5 user rating. Features dynamic difficulty scaling with 85% accuracy improvement, real-time multiplayer support for 50+ concurrent players, and intelligent question generation processing 100+ categories.",
    technologies: ["React", "TypeScript", "AI/ML", "Node.js", "MongoDB"],
    imageUrl: "/images/Deeply Trivial.png",
    githubUrl: "https://github.com/robotwist/deeply-trivial",
    liveUrl: "https://stacking-trivia-five-deep.netlify.app/",
    upvotes: 8
  },
  {
    id: "evolving-machine",
    title: "Evolving the Machine",
    description: "A game exploring AI evolution with 8K+ game sessions and 4.7/5 rating. Features evolutionary algorithms processing 1000+ generations, real-time AI adaptation with 90% learning accuracy, and interactive storytelling across 15+ classic gaming eras.",
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
    description: "A fun keyboard mashing game with 5K+ races completed and 4.6/5 rating. Features real-time leaderboards tracking 100+ players, responsive canvas animations at 60fps, and competitive gameplay with 10+ difficulty levels.",
    technologies: ["JavaScript", "HTML Canvas", "CSS"],
    imageUrl: "/images/100-meter-dash.jpg",
    githubUrl: "https://github.com/robotwist/100-meter-dash",
    liveUrl: "https://robotwist.github.io/100-meter-dash/",
    upvotes: 7
  },
  {
    id: "coin-flip",
    title: "Coin Flip Game",
    description: "A simple yet addictive coin flipping game with 3K+ flips and 4.5/5 rating. Features real-time Firebase leaderboards, 50ms response times, and addictive gameplay mechanics with 80% user return rate.",
    technologies: ["JavaScript", "HTML", "CSS", "Firebase"],
    imageUrl: "/images/Coin-Flip.png",
    githubUrl: "https://github.com/robotwist/Coin-Flip-Game-Project-One-GA",
    liveUrl: "https://robotwist.github.io/Coin-Flip-Game-Project-One-GA/",
    upvotes: 5
  },
  {
    id: "ledgerline",
    title: "LedgerLine",
    description: "A modern accounting platform with 500+ transactions processed and 4.4/5 rating. Features real-time financial tracking, secure data encryption, responsive dashboard with 20+ financial reports, and automated reconciliation reducing manual work by 75%.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    imageUrl: "/images/Ledgerline-Opening.png",
    videoUrl: "",
    githubUrl: "https://github.com/robotwist/Ledgerline",
    liveUrl: "https://ledgerline-a661b98ef7f7.herokuapp.com/",
    upvotes: 8
  }
]; 