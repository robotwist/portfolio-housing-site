# Ollama Deployment Guide

## Deploy Ollama to Heroku

### Step 1: Install Heroku CLI
```bash
# Install Heroku CLI if you haven't already
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
# Create a new Heroku app
heroku create your-ollama-app-name

# Set the buildpack to Docker
heroku buildpacks:set heroku/docker
```

### Step 4: Deploy to Heroku
```bash
# Deploy the app
git push heroku main

# Scale the dyno (you might need to upgrade for more memory)
heroku ps:scale web=1
```

### Step 5: Get Heroku URL
1. Your app will be available at: `https://your-ollama-app-name.herokuapp.com`
2. Test it: `https://your-ollama-app-name.herokuapp.com/api/tags`

### Step 6: Update Netlify Environment
1. Go to your Netlify project settings
2. Add environment variable:
   - `OLLAMA_URL=https://your-ollama-app-name.herokuapp.com`

### Step 7: Redeploy Netlify
```bash
netlify deploy --prod
```

## Cost Estimate
- **Heroku Basic Dyno**: $7/month
- **Memory**: 512MB RAM (sufficient for Llama 3.2)
- **Total**: ~$7/month

## Alternative: Railway (Cheaper)
If Heroku is too expensive, Railway is cheaper:
1. Go to [railway.app](https://railway.app)
2. Use the existing Dockerfile
3. Deploy from GitHub
4. Cost: ~$2-3/month

## Testing
Once deployed, test the chatbot - it should now use Llama 3.2 for all responses!

## Troubleshooting
- If you get memory errors, upgrade to a larger dyno
- First deployment may take 15-20 minutes (downloading Llama 3.2)
- Check logs: `heroku logs --tail`
