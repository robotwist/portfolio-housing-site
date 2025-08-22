# Rob.AI Chatbot Setup Guide

## Overview

Rob.AI is a playful and intelligent chatbot that helps visitors learn about Rob's portfolio, background, and projects. It currently uses enhanced keyword matching with a fun, energetic personality, with plans to integrate Mistral AI for even more natural conversations.

## Features

- **Playful Personality**: Rob.AI has a fun, energetic personality that reflects Rob's can-do attitude
- **Portfolio Knowledge**: Knows about Rob's projects, background as a D1 athlete, and technical skills
- **Smart Responses**: Uses intelligent keyword matching for natural conversations
- **Future AI Integration**: Ready for Mistral AI integration when configured
- **Responsive Design**: Works seamlessly on all devices

## Setup Instructions

### 1. Get a Mistral AI API Key

1. Visit [Mistral AI Console](https://console.mistral.ai/)
2. Sign up for an account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Mistral AI API Key for Rob.AI chatbot
MISTRAL_API_KEY=your_mistral_api_key_here

# Optional: Other API keys for enhanced functionality
# OPENAI_API_KEY=your_openai_api_key_here
# SENDGRID_API_KEY=your_sendgrid_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Your Name's Portfolio"
NEXT_PUBLIC_CONTACT_EMAIL=contact@your-domain.com

# Social information
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
NEXT_PUBLIC_LINKEDIN_USERNAME=yourusername
```

### 3. Install Dependencies

The Mistral AI package is already included. If you need to reinstall:

```bash
npm install @mistralai/mistralai
```

### 4. Deploy

The chatbot is ready to use immediately with smart keyword-based responses. For future Mistral AI integration:

1. Get a Mistral AI API key from [console.mistral.ai](https://console.mistral.ai/)
2. Add `MISTRAL_API_KEY=your_key_here` to your `.env.local`
3. Uncomment and configure the Mistral integration in `src/app/api/chat/route.ts`

## Customization

### Updating Rob.AI's Personality

Edit the system prompt in `src/app/api/chat/route.ts`:

```typescript
content: `You are Rob.AI, a playful and friendly AI assistant for Rob Wistrand's portfolio website. You have a fun, energetic personality and love to talk about:

- Rob's background as a D1 athlete and 9-time state champion
- His transition into software development
- His passion for climbing 14,000 ft peaks (he's climbed 12 across multiple states)
- His projects and technical skills
- His love for AI/ML and game development
- His experience with React, Node.js, MongoDB, AWS, and other technologies

Keep responses conversational, enthusiastic, and helpful. Use emojis occasionally to keep things fun!`
```

### Adding New Fallback Responses

Add new patterns to the `FALLBACK_RESPONSES` array in the same file.

## Troubleshooting

### Chatbot Not Responding

1. Check browser console for errors
2. Verify API key is set correctly
3. Check network tab for failed requests
4. Ensure the `/api/chat` endpoint is accessible

### Mistral AI Errors

If Mistral AI fails, the chatbot automatically falls back to keyword matching. Check:
1. API key validity
2. Network connectivity
3. Mistral AI service status

## Security Notes

- API keys are server-side only and not exposed to the client
- The chatbot has rate limiting and error handling
- Sandboxed iframe for live previews prevents security issues

## Support

For issues or questions about Rob.AI, check the main README or create an issue in the repository.
