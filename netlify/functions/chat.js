// Ollama will be deployed to Railway
let ollama = null;

try {
  const { Ollama } = require('ollama');
  // Use Railway Ollama URL (we'll set this as environment variable)
  const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
  ollama = new Ollama({
    host: OLLAMA_URL
  });
} catch (error) {
  console.log('Ollama not available, using keyword matching only');
}

// Enhanced fallback response patterns with personality and contact redirection
const FALLBACK_RESPONSES = [
  // Greetings
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
    response: "Hey there! 👋 I'm Rob.AI, your friendly guide to Rob's awesome portfolio! Want to chat about his projects or connect with him directly?",
  },
  
  // Specific Projects
  {
    keywords: ['authentic internet', 'authentic-internet', 'authentic reader', 'authentic dashboard'],
    response: "Authentic Internet is one of Rob's favorite projects! It's a full-stack social media data processing platform with interactive visualizations and real-time network analysis. He built it with Next.js and React, featuring responsive design and scalable architecture. It showcases his skills in data visualization, real-time processing, and modern web development. Pretty cool stuff! 🚀",
  },
  {
    keywords: ['nkd man', 'nkd', 'summon', 'chrome extension', 'extension'],
    response: "Summon NK D Man is Rob's hilarious Chrome extension! It unleashes NK D Man onto any webpage with a four-act streaking prank animation. Features smooth 60fps animations and creative problem-solving - it's got 8+ active users and showcases his JavaScript animation skills. Definitely one of his more entertaining projects! 😂",
  },
  {
    keywords: ['deeply trivial', 'trivia', 'game', 'stacking trivia'],
    response: "Deeply Trivial is Rob's fun trivia game! It's a web-based game with progressive difficulty levels and engaging gameplay. Built with modern web technologies, it showcases his skills in game development and user experience design. Want to try it out? Check out the live demo! 🎮",
  },
  {
    keywords: ['unforgiving minute', 'running', 'training', 'paces', 'calculator'],
    response: "Unforgiving Minute is Rob's running training and coaching platform! It features a training paces calculator based on current race times, helping runners optimize their training. Built with his passion for athletics and technology, it combines his background as a D1 athlete with his software development skills. Perfect for runners looking to improve their performance! 🏃‍♂️",
  },
  {
    keywords: ['evolving machine', 'evolving the machine', 'ai game', 'video games'],
    response: "Evolving the Machine is Rob's innovative game where a human and an evolving AI fight through the history of video games! It's a fascinating exploration of AI development and gaming history. The AI learns and adapts as it progresses through different gaming eras, showcasing Rob's interest in AI/ML and game development. A unique blend of technology and creativity! 🤖",
  },
  
  // General Project Topics
  {
    keywords: ['project', 'portfolio', 'work', 'build', 'created', 'developed'],
    response: "Rob's got some awesome projects! Check out the cards above - hover over them to see demos. If you want to discuss any of them in detail, you can reach out to Rob directly through the contact form or connect with him on LinkedIn!",
  },
  
  // Contact & Hiring
  {
    keywords: ['contact', 'reach', 'email', 'message', 'hire', 'job', 'opportunity', 'work together', 'collaborate', 'freelance', 'contract'],
    response: "Great to hear you're interested in connecting! You can reach Rob through:\n\n1. The contact form below 👇\n2. LinkedIn: [Your LinkedIn URL]\n3. X (Twitter): [Your X handle]\n\nHe's always excited to hear about new opportunities!",
  },
  
  // Technical Skills
  {
    keywords: ['github', 'code', 'repository', 'repo', 'source code', 'open source'],
    response: "Each project has its GitHub link - just click the GitHub icon on any project card! Rob loves open source and is always happy to discuss code. Want to connect with him about it?",
  },
  {
    keywords: ['skill', 'tech', 'technology', 'framework', 'language', 'programming', 'coding', 'development', 'software'],
    response: "Rob's got a wide range of skills! From AI/ML to full-stack development, he's pretty versatile. The tech scroll above shows some of his expertise. Want to discuss how he could help your team?",
  },
  {
    keywords: ['react', 'next.js', 'node.js', 'javascript', 'typescript', 'python', 'mongodb', 'aws', 'docker'],
    response: "Rob is proficient in React, Next.js, Node.js, TypeScript, Python, MongoDB, AWS, and Docker! He's built full-stack applications, AI integrations, and scalable systems. Want to discuss specific technologies or see his work in action?",
  },
  
  // Background & Experience
  {
    keywords: ['resume', 'cv', 'experience', 'background', 'history', 'career'],
    response: "You can find Rob's resume right here on the site! It's in the resume section above. Want to discuss his experience in more detail? He'd love to chat - just use the contact form below!",
  },
  {
    keywords: ['athlete', 'd1', 'state champion', 'sports', 'climbing', 'mountains', 'peaks'],
    response: "Rob was a D1 athlete and 9-time state champion! He's climbed 12 different 14,000 ft peaks across multiple states. His athletic background taught him discipline, work ethic, and determination - qualities he brings to every project! 🏔️",
  },
  
  // Games & Entertainment
  {
    keywords: ['game', 'pong', 'play', 'gaming', 'entertainment', 'fun'],
    response: "Oh, you found the Pong game! 🎮 It's a fun little demo of Rob's game development skills. Want to see more of what he can build? Check out his other projects or reach out to discuss game development opportunities!",
  },
  
  // AI & Machine Learning
  {
    keywords: ['ai', 'chatbot', 'bot', 'assistant', 'machine learning', 'ml', 'artificial intelligence', 'llama', 'ollama'],
    response: "I'm just a simple bot, but Rob's working on some exciting AI projects! He's particularly interested in enhancing chatbots with advanced NLP and machine learning. Want to discuss AI development with him?",
  },
  
  // Company & Business
  {
    keywords: ['company', 'startup', 'business', 'entrepreneur', 'founder', 'team', 'leadership'],
    response: "Rob has experience working with teams and contributing to business success through technology. He's passionate about building solutions that drive real value. Want to discuss how he could help your company?",
  },
  
  // Education & Learning
  {
    keywords: ['education', 'learn', 'study', 'degree', 'university', 'college', 'school'],
    response: "Rob's educational background in athletics and his self-taught software development journey shows his ability to learn quickly and adapt. He's always expanding his skills and knowledge!",
  },
  
  // Location & Travel
  {
    keywords: ['where', 'location', 'city', 'state', 'travel', 'remote', 'relocate'],
    response: "Rob is based in the US and is open to remote work opportunities. He's traveled extensively for climbing adventures and is comfortable working with distributed teams!",
  },
  
  // Availability & Timing
  {
    keywords: ['available', 'timeline', 'when', 'schedule', 'timing', 'start date'],
    response: "Rob is currently available for new opportunities! He can start immediately and is flexible with timelines. Reach out through the contact form to discuss availability and next steps!",
  },
  
  // Salary & Compensation
  {
    keywords: ['salary', 'pay', 'rate', 'compensation', 'budget', 'cost', 'price'],
    response: "Rob is open to discussing compensation based on the scope and requirements of the project. He values fair compensation that reflects the value he brings. Let's have a conversation about your needs!",
  },
  
  // Process & Approach
  {
    keywords: ['process', 'approach', 'methodology', 'how', 'workflow', 'agile', 'scrum'],
    response: "Rob follows agile methodologies and believes in iterative development, clear communication, and delivering value quickly. He adapts his approach based on team needs and project requirements!",
  }
];

// Fun random responses for unmatched queries
const RANDOM_RESPONSES = [
  "That's an interesting question! While I'm just a simple bot, Rob would love to chat about it. Did you know he was a D1 athlete? He brings that same dedication to his development work!",
  "Hmm, that's beyond my simple programming. But I know Rob would be excited to discuss this! He's climbed 12 different 14,000 ft peaks across multiple states - he loves tackling big challenges!",
  "I'm just a basic bot, but Rob's the real expert here. He was a 9-time state champion athlete - that's the kind of determination he brings to every project!",
  "That's a great question! While I'm limited in my responses, Rob would be happy to dive deep into this topic with you. He's built some amazing AI-powered applications that you can check out in his portfolio!",
  "I'm just here to help visitors, but Rob's the one you really want to talk to about that! He's developed several full-stack applications using React, Node.js, and MongoDB - check them out!",
  "That's beyond my simple script, but I know Rob would love to discuss this with you. He's particularly proud of his work with AI integration and machine learning projects!",
  "I'm just a friendly bot, but Rob's the real expert. He's worked on some fascinating game development projects using DragonRuby - you should check out his portfolio!",
  "While I can't answer that, I know Rob would love to discuss it with you. He's got experience with cloud technologies and DevOps - AWS and Google Cloud are his specialties!",
  "That's beyond my capabilities, but Rob would love to talk about it. He's worked with various cloud storage solutions and CDN implementations!",
  "While I'm just a simple bot, Rob would be happy to discuss this. He's experienced with various authentication methods and security implementations!"
];

// Monitoring data structure
let monitoringData = {
  totalRequests: 0,
  keywordMatches: 0,
  defaultResponses: 0,
  unmatchedQueries: [],
  lastReset: new Date().toISOString()
};

// Function to log unmatched queries for monitoring
function logUnmatchedQuery(message) {
  monitoringData.defaultResponses++;
  monitoringData.unmatchedQueries.push({
    query: message,
    timestamp: new Date().toISOString()
  });
  
  // Keep only last 100 unmatched queries to prevent memory issues
  if (monitoringData.unmatchedQueries.length > 100) {
    monitoringData.unmatchedQueries = monitoringData.unmatchedQueries.slice(-100);
  }
  
  console.log(`🔍 MONITORING: Unmatched query: "${message}" | Total defaults: ${monitoringData.defaultResponses}`);
}

// Function to get monitoring stats
function getMonitoringStats() {
  return {
    ...monitoringData,
    successRate: monitoringData.totalRequests > 0 ? 
      ((monitoringData.totalRequests - monitoringData.defaultResponses) / monitoringData.totalRequests * 100).toFixed(1) : 0
  };
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Handle monitoring requests
  if (event.httpMethod === 'GET' && event.path.includes('/stats')) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(getMonitoringStats()),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { message, mode = 'normal' } = body;
    
    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Update monitoring - increment total requests
    monitoringData.totalRequests++;

    // Try Llama 3.2 first if available, fall back to keyword matching if it fails
    if (ollama) {
      try {
        let systemPrompt = '';
        
        if (mode === 'interview') {
          systemPrompt = `You ARE Rob Wistrand speaking in first person. You're in an interview and should answer as if you're Rob himself. Be authentic, funny, and tell your real stories:

- You were a D1 athlete and 9-time state champion - talk about the discipline and work ethic you developed
- You've climbed 12 different 14,000 ft peaks across multiple states - share some crazy climbing stories
- You transitioned from athletics to software development - talk about how your competitive drive translates to coding
- You love AI/ML and game development - share your passion for building cool things
- You're proud of your projects like Unforgiving Minute (running platform) and your Chrome extensions
- You have a playful personality and love to joke around

Answer as Rob would - with energy, humor, and authenticity. Use "I" statements and share personal anecdotes. Keep it conversational and under 200 words.`;
        } else {
          systemPrompt = `You are Rob.AI, a playful and friendly AI assistant for Rob Wistrand's portfolio website. You have a fun, energetic personality and love to talk about:

- Rob's background as a D1 athlete and 9-time state champion
- His transition into software development and passion for coding
- His love for climbing 14,000 ft peaks (he's climbed 12 across multiple states)
- His projects and technical skills (React, Node.js, MongoDB, AWS, AI/ML)
- His experience with game development and AI integration
- His work ethic and determination from his athletic background

Keep responses conversational, enthusiastic, and helpful. Use emojis occasionally to keep things fun! If someone asks about contacting Rob, direct them to the contact form below or his LinkedIn. Keep responses under 200 words.`;
        }

        const response = await ollama.chat({
          model: 'llama3:8b',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          options: {
            temperature: 0.7,
            top_p: 0.9,
            num_predict: 300
          }
        });

        console.log(`🤖 AI RESPONSE: Llama 3.2 generated response for: "${message}"`);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: response.message.content,
            timestamp: new Date().toISOString()
          }),
        };

      } catch (llamaError) {
        console.log('Llama 3.2 failed, falling back to keyword matching:', llamaError);
      }
    }
    
    // Fall back to keyword matching
    const messageLower = message.toLowerCase();
    for (const pattern of FALLBACK_RESPONSES) {
      if (pattern.keywords.some(keyword => messageLower.includes(keyword))) {
        monitoringData.keywordMatches++;
        console.log(`✅ KEYWORD MATCH: "${message}" matched keywords: ${pattern.keywords.filter(k => messageLower.includes(k)).join(', ')}`);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: pattern.response,
            timestamp: new Date().toISOString()
          }),
        };
      }
    }
    
    // If no keyword match, log and return a random response
    logUnmatchedQuery(message);
    const randomResponse = RANDOM_RESPONSES[Math.floor(Math.random() * RANDOM_RESPONSES.length)];
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: randomResponse,
        timestamp: new Date().toISOString()
      }),
    };
    
  } catch (error) {
    console.error('Error processing chat message:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process your message' }),
    };
  }
};
