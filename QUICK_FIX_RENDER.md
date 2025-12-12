# Quick Fix for Render Deployment

## The Problem
Your frontend is calling `http://localhost:8080` instead of your Render backend URL.

## The Fix (3 Steps)

### 1. Get Your Backend URL
- Go to Render dashboard → Your backend service
- Copy the URL (e.g., `https://blogapp-backend-xyz.onrender.com`)

### 2. Set Frontend Environment Variables in Render
Go to your **Frontend** service → **Environment** tab → Add:

```
VITE_USER_API_ENDPOINT=https://YOUR-BACKEND-URL.onrender.com/api/v1/user
VITE_TWEET_API_ENDPOINT=https://YOUR-BACKEND-URL.onrender.com/api/v1/tweet
```

**Replace `YOUR-BACKEND-URL.onrender.com` with your actual backend URL!**

### 3. Set Backend Environment Variable
Go to your **Backend** service → **Environment** tab → Add/Update:

```
FRONTEND_URL=https://blogapp-1-kbr8.onrender.com
```

**Replace with your actual frontend URL!**

### 4. Redeploy Both Services
- Render will auto-redeploy when you save environment variables
- Or manually trigger redeploy from dashboard

## That's It! ✅

After redeployment, your app should work. The frontend will now call your Render backend instead of localhost.

