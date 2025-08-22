import { NextResponse } from 'next/server';

// Note: Mistral AI integration is available but requires proper setup
// For now, we'll use the enhanced fallback responses

// Enhanced fallback response patterns with personality and contact redirection
const FALLBACK_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hey there! 👋 I'm Rob.AI, your friendly guide to Rob's awesome portfolio! Want to chat about his projects or connect with him directly?",
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // TODO: Add Mistral AI integration when properly configured
    // For now, we'll use the enhanced fallback responses

    // Check for keyword matches first
    const messageLower = message.toLowerCase();
    for (const pattern of FALLBACK_RESPONSES) {
      if (pattern.keywords.some(keyword => messageLower.includes(keyword))) {
        return NextResponse.json({
          message: pattern.response,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // If no keyword match, return a random response
    const randomResponse = RANDOM_RESPONSES[Math.floor(Math.random() * RANDOM_RESPONSES.length)];
    return NextResponse.json({
      message: randomResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { error: 'Failed to process your message' },
      { status: 500 }
    );
  }
} 