# Deployment Notes

## PWA Configuration

### Development vs Production

**For Development:**
- The `output: 'export'` setting in `next.config.js` is commented out
- This allows the development server to work properly with static files
- PWA features work normally in development

**For Production (Netlify/Vercel):**
- Uncomment the `output: 'export'` line in `next.config.js` before deploying
- This enables static export for hosting platforms
- PWA manifest and service worker will work correctly

### PWA Icons

The PWA icons are located in `/public/icons/` and include:
- icon-72x72.png
- icon-96x96.png  
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### Manifest Configuration

The PWA manifest is configured in `/public/manifest.json` and includes:
- App name: "Portfolio Housing Site"
- Theme color: #0d1117 (dark theme)
- Standalone display mode
- All required icon sizes

### Service Worker

The service worker is located at `/public/sw.js` and handles:
- Caching strategies for static assets
- Offline functionality
- Network-first and cache-first strategies

## Recent Updates

### Project Updates
- **Unforgiving Minute**: Updated to reflect running training site with GoldenPace Calculator
- **Evolving the Machine**: Updated to reflect AI vs Human gaming evolution game
- **Button Text**: Changed "Demo" to "Live Link" for all projects

### Technical Fixes
- Fixed static file serving issues in development
- Resolved PWA manifest path conflicts
- Cleared corrupted cache files
- Fixed port conflicts and server errors
