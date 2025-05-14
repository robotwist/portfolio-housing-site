import { NextResponse } from 'next/server';

// Simple fallback response patterns when API fails or limit is reached
const FALLBACK_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello there! How can I help you with the portfolio today?",
  },
  {
    keywords: ['project', 'portfolio', 'work'],
    response: "The portfolio showcases several projects with video previews. Hover over any project card to see a demo!",
  },
  {
    keywords: ['contact', 'reach', 'email', 'message'],
    response: "You can use the contact form at the bottom of the page to send a message.",
  },
  {
    keywords: ['github', 'code', 'repository', 'repo'],
    response: "Each project has a link to its GitHub repository where you can explore the code.",
  },
  {
    keywords: ['skill', 'tech', 'technology', 'framework', 'language'],
    response: "The portfolio highlights skills in React, TypeScript, Next.js, and various other modern web technologies.",
  },
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

    // You can get a free API token from https://huggingface.co/settings/tokens
    const HF_API_TOKEN = process.env.HUGGINGFACE_API_KEY || '';
    
    try {
      // Use Hugging Face's Inference API with a free model
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HF_API_TOKEN}`,
          },
          body: JSON.stringify({
            inputs: `<s>[INST] You are a helpful assistant for a portfolio website. Keep your answers brief, friendly, and related to the portfolio. 
Question: ${message} [/INST]</s>`,
            parameters: {
              max_new_tokens: 250,
              temperature: 0.7,
              top_p: 0.9,
              do_sample: true,
              return_full_text: false,
            },
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
      const result = await response.json();
      let aiResponse = result[0]?.generated_text || '';
      
      // Clean up the response (remove instruction tokens if present)
      aiResponse = aiResponse.replace(/<s>\[INST\].*?\[\/INST\]<\/s>/gs, '').trim();
      
      return NextResponse.json({
        message: aiResponse,
        timestamp: new Date().toISOString()
      });
    } catch (apiError) {
      console.warn('AI API error, falling back to pattern matching:', apiError);
      
      // Fall back to pattern matching if the API fails
      const messageLower = message.toLowerCase();
      let responseText = "I'm sorry, I don't have an answer for that yet. My training is limited to portfolio information.";
      
      for (const pattern of FALLBACK_RESPONSES) {
        if (pattern.keywords.some(keyword => messageLower.includes(keyword))) {
          responseText = pattern.response;
          break;
        }
      }
      
      return NextResponse.json({
        message: responseText,
        timestamp: new Date().toISOString(),
        fallback: true
      });
    }
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { error: 'Failed to process your message' },
      { status: 500 }
    );
  }
} 