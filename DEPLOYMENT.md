# Deployment Guide

This document provides instructions for deploying your portfolio site to various platforms.

## Preparing for Deployment

1. Update your project information in `src/components/projects/ProjectsSection.tsx`
2. Replace placeholder images and videos with your actual project demos
3. Update personal links in `src/components/layout/Header.tsx`
4. Customize text in `src/components/layout/HeroSection.tsx`

## Environment Variables

For enhanced functionality, create a `.env.local` file with the following variables:

```
# API Keys for AI Services (if using a real AI service)
OPENAI_API_KEY=your_openai_api_key

# Email Service (example for SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your@email.com
EMAIL_TO=recipient@email.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Your Name's Portfolio"
NEXT_PUBLIC_CONTACT_EMAIL=contact@your-domain.com

# Social information
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
NEXT_PUBLIC_LINKEDIN_USERNAME=yourusername
```

## Deployment Options

### Vercel (Recommended)

Vercel is the easiest way to deploy a Next.js application:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy your site:
   ```bash
   vercel
   ```

3. Follow the prompts to link to your Vercel account and project

For production deployment:
```bash
vercel --prod
```

### Netlify

1. Build your application:
   ```bash
   npm run build
   ```

2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy your site:
   ```bash
   netlify deploy
   ```

4. Follow the prompts to deploy the `out` directory

### GitHub Pages

1. Add a `next.config.js` file with your base path:
   ```js
   const nextConfig = {
     output: 'export',
     basePath: '/portfolio-site',
   };
   
   module.exports = nextConfig;
   ```

2. Build your application:
   ```bash
   npm run build
   ```

3. Deploy the `out` directory to GitHub Pages

## Enhancing the Portfolio

### Adding AI Chat Integration

To connect the AI chat to a real service:

1. Update `src/app/api/chat/route.ts` to use OpenAI or another AI service
2. Example OpenAI implementation:
   ```typescript
   import { NextResponse } from 'next/server';
   import OpenAI from 'openai';
   
   const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY,
   });
   
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
       
       const completion = await openai.chat.completions.create({
         messages: [
           { role: "system", content: "You are a helpful assistant for my portfolio website." },
           { role: "user", content: message }
         ],
         model: "gpt-3.5-turbo",
       });
       
       return NextResponse.json({
         message: completion.choices[0].message.content,
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
   ```

3. Install OpenAI package:
   ```bash
   npm install openai
   ```

### Adding Email Integration for Contact Form

To send emails from the contact form:

1. Update `src/app/api/contact/route.ts` to use an email service like SendGrid
2. Example implementation:
   ```typescript
   import { NextResponse } from 'next/server';
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
   
   export async function POST(request: Request) {
     try {
       const body = await request.json();
       const { name, email, message } = body;
       
       if (!name || !email || !message) {
         return NextResponse.json(
           { error: 'Name, email, and message are required' },
           { status: 400 }
         );
       }
       
       const msg = {
         to: process.env.EMAIL_TO || 'your@email.com',
         from: process.env.EMAIL_FROM || 'noreply@yoursite.com',
         subject: `Portfolio Contact: ${name}`,
         text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
         html: `<p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>`,
       };
       
       await sgMail.send(msg);
       
       return NextResponse.json(
         { success: true, message: 'Message sent successfully' },
         { status: 200 }
       );
     } catch (error) {
       console.error('Error sending email:', error);
       return NextResponse.json(
         { error: 'Failed to send message' },
         { status: 500 }
       );
     }
   }
   ```

3. Install SendGrid package:
   ```bash
   npm install @sendgrid/mail
   ```

## Performance Optimization

1. Optimize images before uploading:
   - Use WebP format for images
   - Compress videos for web streaming

2. Enable image optimization in Next.js:
   - Use the Next.js Image component
   - Configure image domains in next.config.js

3. Use lazy loading for projects beyond the initial view 