# Ollama Deployment Guide

## Deploy Ollama to Railway

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project

### Step 2: Deploy Ollama
1. **Connect GitHub Repository**
   - Click "Deploy from GitHub repo"
   - Select this repository
   - Railway will detect the Dockerfile automatically

2. **Configure Environment Variables**
   - Go to your Railway project settings
   - Add environment variables:
     - `OLLAMA_HOST=0.0.0.0`
     - `OLLAMA_ORIGINS=*`

3. **Deploy**
   - Railway will build and deploy automatically
   - First deployment may take 10-15 minutes (downloading Llama 3.2)

### Step 3: Get Railway URL
1. Once deployed, go to your Railway project
2. Copy the generated URL (e.g., `https://your-project.railway.app`)
3. Test it: `https://your-project.railway.app/api/tags`

### Step 4: Update Netlify Environment
1. Go to your Netlify project settings
2. Add environment variable:
   - `OLLAMA_URL=https://your-project.railway.app`

### Step 5: Redeploy Netlify
```bash
netlify deploy --prod
```

## Cost Estimate
- **Railway Free Tier**: $5/month credit
- **Llama 3.2 8B**: ~$2-3/month for moderate usage
- **Total**: Likely free or very low cost

## Alternative: Heroku
If Railway doesn't work, Heroku is another option:
1. Use the Heroku CLI
2. Deploy with Docker
3. Cost: ~$7/month

## Testing
Once deployed, test the chatbot - it should now use Llama 3.2 for all responses!

## Troubleshooting
- Check Railway logs in the dashboard
- First deployment may take 15-20 minutes (downloading Llama 3.2)
- If you get memory errors, upgrade the Railway plan
