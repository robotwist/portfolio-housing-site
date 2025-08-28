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

// Enhanced fallback response patterns with honest, humble tone
const FALLBACK_RESPONSES = [
  // Greetings
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
    response: "Hey there! 👋 I'm Rob.AI, a simple bot here to help you explore Rob's portfolio. Feel free to ask about his projects or how to get in touch!",
  },
  
  // Specific Projects
  {
    keywords: ['authentic internet', 'authentic-internet', 'authentic reader', 'authentic dashboard'],
    response: "Authentic Internet is one of Rob's projects exploring social media data visualization. It's built with Next.js and React, featuring interactive charts and data analysis tools. It demonstrates his interest in data processing and frontend development.",
  },
  {
    keywords: ['nkd man', 'nkd', 'summon', 'chrome extension', 'extension'],
    response: "Summon NK D Man is a fun Chrome extension Rob built! It adds a playful animation to web pages. It's a simple project that demonstrates JavaScript animation skills and browser extension development.",
  },
  {
    keywords: ['deeply trivial', 'trivia', 'game', 'stacking trivia'],
    response: "Deeply Trivial is a trivia game Rob built with React and TypeScript. It features progressive difficulty adjustment and responsive design. It's a good example of his game development and state management skills.",
  },
  {
    keywords: ['unforgiving minute', 'running', 'training', 'paces', 'calculator'],
    response: "Unforgiving Minute is a running training platform Rob built. It includes a pace calculator based on current race times, helping runners determine appropriate training paces. It combines his interest in running with web development.",
  },
  {
    keywords: ['evolving machine', 'evolving the machine', 'ai game', 'video games'],
    response: "Evolving the Machine is a game Rob built exploring AI evolution through video game history. It features interactive storytelling and evolutionary algorithms. It's an interesting project combining game development with AI concepts.",
  },
  
  // General Project Topics
  {
    keywords: ['project', 'portfolio', 'work', 'build', 'created', 'developed'],
    response: "Rob has several projects in his portfolio - you can see them in the cards above. Each represents different skills and learning experiences. Feel free to ask about specific ones or reach out to him directly!",
  },
  
  // Contact & Hiring
  {
    keywords: ['contact', 'reach', 'email', 'message', 'hire', 'job', 'opportunity', 'work together', 'collaborate', 'freelance', 'contract'],
    response: "Great to hear you're interested in connecting! You can reach Rob through the contact form below or connect with him on LinkedIn. He's always open to discussing new opportunities and collaborations.",
  },
  
  // Technical Skills
  {
    keywords: ['github', 'code', 'repository', 'repo', 'source code', 'open source'],
    response: "Each project has its GitHub link - just click the GitHub icon on any project card! Rob enjoys sharing his code and is happy to discuss his projects and development approach.",
  },
  {
    keywords: ['skill', 'tech', 'technology', 'framework', 'language', 'programming', 'coding', 'development', 'software'],
    response: "Rob works with various technologies including React, TypeScript, Node.js, Python, and others. His projects demonstrate different aspects of web development. Feel free to ask about specific technologies!",
  },
  {
    keywords: ['react', 'next.js', 'node.js', 'javascript', 'typescript', 'python', 'mongodb', 'aws', 'docker'],
    response: "Rob has experience with React, Next.js, Node.js, TypeScript, Python, MongoDB, and other technologies. His projects showcase different combinations of these tools. Want to discuss specific technologies?",
  },
  
  // Background & Experience
  {
    keywords: ['resume', 'cv', 'experience', 'background', 'history', 'career'],
    response: "You can find Rob's resume right here on the site! It's in the resume section above. He'd be happy to discuss his experience and background in more detail - just reach out!",
  },
  {
    keywords: ['athlete', 'd1', 'state champion', 'sports', 'climbing', 'mountains', 'peaks'],
    response: "Rob has an athletic background and enjoys climbing. He finds that the discipline and persistence from sports translate well to software development. It's part of what drives his approach to problem-solving.",
  },
  
  // Games & Entertainment
  {
    keywords: ['game', 'pong', 'play', 'gaming', 'entertainment', 'fun'],
    response: "Oh, you found the Pong game! 🎮 It's a fun little demo of Rob's game development skills. He enjoys building interactive projects and exploring different types of applications.",
  },
  
  // AI & Machine Learning
  {
    keywords: ['ai', 'chatbot', 'bot', 'assistant', 'machine learning', 'ml', 'artificial intelligence', 'llama', 'ollama'],
    response: "I'm a simple bot, but Rob is interested in AI and machine learning. He's worked on projects involving data analysis and is exploring ways to integrate AI into web applications.",
  },
  
  // Company & Business
  {
    keywords: ['company', 'startup', 'business', 'entrepreneur', 'founder', 'team', 'leadership'],
    response: "Rob has experience working on various projects and enjoys collaborating with teams. He's interested in building solutions that provide real value and is always learning new approaches.",
  },
  
  // Education & Learning
  {
    keywords: ['education', 'learn', 'study', 'degree', 'university', 'college', 'school'],
    response: "Rob is largely self-taught in software development, though he has a background in athletics. He's always learning new technologies and approaches, which is reflected in the variety of his projects.",
  },
  
  // Location & Travel
  {
    keywords: ['where', 'location', 'city', 'state', 'travel', 'remote', 'relocate'],
    response: "Rob is based in the US and is open to remote work opportunities. He enjoys traveling and is comfortable working with distributed teams.",
  },
  
  // Availability & Timing
  {
    keywords: ['available', 'timeline', 'when', 'schedule', 'timing', 'start date'],
    response: "Rob is currently available for new opportunities! He can start immediately and is flexible with timelines. Reach out through the contact form to discuss availability and next steps!",
  },
  
  // Salary & Compensation
  {
    keywords: ['salary', 'pay', 'rate', 'compensation', 'budget', 'cost', 'price'],
    response: "Rob is open to discussing compensation based on the scope and requirements of the project. He values fair compensation and is happy to have an open conversation about your needs.",
  },
  
  // Process & Approach
  {
    keywords: ['process', 'approach', 'methodology', 'how', 'workflow', 'agile', 'scrum'],
    response: "Rob follows agile methodologies and believes in iterative development, clear communication, and delivering value quickly. He adapts his approach based on team needs and project requirements.",
  }
];

// Honest, humble random responses for unmatched queries
const RANDOM_RESPONSES = [
  "That's an interesting question! While I'm just a simple bot, Rob would love to chat about it. He's always eager to learn and discuss new ideas.",
  "Hmm, that's beyond my simple programming. But I know Rob would be excited to discuss this! He enjoys tackling new challenges and learning opportunities.",
  "I'm just a basic bot, but Rob's the real expert here. He'd be happy to dive into this topic with you - feel free to reach out!",
  "That's a great question! While I'm limited in my responses, Rob would be happy to discuss this with you. He's worked on various projects that might be relevant.",
  "I'm just here to help visitors, but Rob's the one you really want to talk to about that! He's built several applications and would love to discuss your interests.",
  "That's beyond my simple script, but I know Rob would love to discuss this with you. He's particularly interested in new technologies and approaches.",
  "I'm just a friendly bot, but Rob's the real expert. He's worked on various projects and would be happy to discuss this topic with you.",
  "While I can't answer that, I know Rob would love to discuss it with you. He has experience with various technologies and is always learning.",
  "That's beyond my capabilities, but Rob would love to talk about it. He enjoys exploring new ideas and technologies.",
  "While I'm just a simple bot, Rob would be happy to discuss this. He's worked on various projects and is always interested in new challenges."
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
