# Missing Environment Variable Fix

## Problem Identified

Your console shows:
- ✅ `VITE_USER_API_ENDPOINT`: Set correctly (`https://blogapp-osnb.onrender.com/api/v1/user`)
- ❌ `VITE_TWEET_API_ENDPOINT`: **UNDEFINED** (falling back to localhost)

## Solution: Add Missing Environment Variable

### Step 1: Go to Render Dashboard
1. Open [Render Dashboard](https://dashboard.render.com)
2. Click on your **Frontend** service

### Step 2: Add Missing Variable
1. Go to **Environment** tab
2. Click **Add Environment Variable**
3. Add this variable:

**Key:** `VITE_TWEET_API_ENDPOINT`
**Value:** `https://blogapp-osnb.onrender.com/api/v1/tweet`

**Important:** Use the same backend URL as your USER_API_ENDPOINT, just change `/user` to `/tweet`

### Step 3: Save and Redeploy
1. Click **Save Changes**
2. Go to **Manual Deploy** → **Deploy latest commit**
3. Wait for deployment (2-5 minutes)

### Step 4: Verify
After redeployment, check browser console again. You should see:
```
VITE_TWEET_API_ENDPOINT: "https://blogapp-osnb.onrender.com/api/v1/tweet"
TWEET_API_ENDPOINT: "https://blogapp-osnb.onrender.com/api/v1/tweet"
```

## Quick Copy-Paste

In Render Frontend Environment Variables, add:

```
VITE_TWEET_API_ENDPOINT=https://blogapp-osnb.onrender.com/api/v1/tweet
```

That's it! After redeploy, your tweet endpoints will work correctly.

