// Note: Ollama runs locally, not on Netlify servers
// We'll use enhanced keyword matching for production
let ollama = null;

try {
  const { Ollama } = require('ollama');
  ollama = new Ollama({
    host: 'http://localhost:11434' // Default Ollama host
  });
} catch (error) {
  console.log('Ollama not available, using keyword matching only');
}

// Enhanced fallback response patterns with personality and contact redirection
const FALLBACK_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hey there! 👋 I'm Rob.AI, your friendly guide to Rob's awesome portfolio! Want to chat about his projects or connect with him directly?",
  },
  {
    keywords: ['authentic internet', 'authentic-internet'],
    response: "Authentic Internet is one of Rob's favorite projects! It's a full-stack social media data processing platform with interactive visualizations and real-time network analysis. He built it with Next.js and React, featuring responsive design and scalable architecture. It showcases his skills in data visualization, real-time processing, and modern web development. Pretty cool stuff! 🚀",
  },
  {
    keywords: ['nkd man', 'nkd', 'summon'],
    response: "Summon NK D Man is Rob's hilarious Chrome extension! It unleashes NK D Man onto any webpage with a four-act streaking prank animation. Features smooth 60fps animations and creative problem-solving - it's got 8+ active users and showcases his JavaScript animation skills. Definitely one of his more entertaining projects! 😂",
  },
  {
    keywords: ['project', 'portfolio', 'work'],
    response: "Rob's got some awesome projects! Check out the cards above - hover over them to see demos. If you want to discuss any of them in detail, you can reach out to Rob directly through the contact form or connect with him on LinkedIn!",
  },
  {
    keywords: ['contact', 'reach', 'email', 'message', 'hire', 'job', 'opportunity'],
    response: "Great to hear you're interested in connecting! You can reach Rob through:\n\n1. The contact form below 👇\n2. LinkedIn: [Your LinkedIn URL]\n3. X (Twitter): [Your X handle]\n\nHe's always excited to hear about new opportunities!",
  },
  {
    keywords: ['github', 'code', 'repository', 'repo'],
    response: "Each project has its GitHub link - just click the GitHub icon on any project card! Rob loves open source and is always happy to discuss code. Want to connect with him about it?",
  },
  {
    keywords: ['skill', 'tech', 'technology', 'framework', 'language'],
    response: "Rob's got a wide range of skills! From AI/ML to full-stack development, he's pretty versatile. The tech scroll above shows some of his expertise. Want to discuss how he could help your team?",
  },
  {
    keywords: ['resume', 'cv', 'experience'],
    response: "You can find Rob's resume right here on the site! It's in the resume section above. Want to discuss his experience in more detail? He'd love to chat - just use the contact form below!",
  },
  {
    keywords: ['game', 'pong', 'play'],
    response: "Oh, you found the Pong game! 🎮 It's a fun little demo of Rob's game development skills. Want to see more of what he can build? Check out his other projects or reach out to discuss game development opportunities!",
  },
  {
    keywords: ['ai', 'chatbot', 'bot', 'assistant'],
    response: "I'm just a simple bot, but Rob's working on some exciting AI projects! He's particularly interested in enhancing chatbots with advanced NLP and machine learning. Want to discuss AI development with him?",
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
      
      // If no keyword match, return a random response
      const randomResponse = RANDOM_RESPONSES[Math.floor(Math.random() * RANDOM_RESPONSES.length)];
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: randomResponse,
          timestamp: new Date().toISOString()
        }),
      };
    }
    
  } catch (error) {
    console.error('Error processing chat message:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process your message' }),
    };
  }
};
