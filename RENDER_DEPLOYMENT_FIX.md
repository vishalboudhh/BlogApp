# Fix for Render.com Deployment CORS Error

## Problem
Your frontend is trying to access `http://localhost:8080` instead of your Render backend URL, causing CORS errors.

## Solution Steps

### Step 1: Get Your Backend URL from Render

1. Go to your Render dashboard
2. Click on your backend service
3. Copy the URL (e.g., `https://your-backend-name.onrender.com`)

### Step 2: Set Frontend Environment Variables in Render

1. Go to your **Frontend** service in Render dashboard
2. Go to **Environment** tab
3. Add these environment variables:

```
VITE_USER_API_ENDPOINT=https://your-backend-name.onrender.com/api/v1/user
VITE_TWEET_API_ENDPOINT=https://your-backend-name.onrender.com/api/v1/tweet
```

**Important:** Replace `your-backend-name.onrender.com` with your actual backend URL!

4. Click **Save Changes**
5. **Redeploy** your frontend service (Render will auto-redeploy)

### Step 3: Set Backend Environment Variables in Render

1. Go to your **Backend** service in Render dashboard
2. Go to **Environment** tab
3. Add/Update these environment variables:

```
FRONTEND_URL=https://blogapp-1-kbr8.onrender.com
MongoDB_URI=your_mongodb_connection_string
TOKENSECRET=your_jwt_secret
PORT=10000
```

**Important:** 
- Replace `blogapp-1-kbr8.onrender.com` with your actual frontend URL
- Make sure MongoDB_URI and TOKENSECRET are set

4. Click **Save Changes**
5. **Redeploy** your backend service

### Step 4: Verify the Fix

1. After redeployment, check your frontend URL
2. Open browser console (F12)
3. Check Network tab - API calls should now go to your Render backend URL, not localhost
4. Try logging in or creating a post

## Common Issues

### Issue 1: Still seeing localhost URLs
**Solution:** 
- Make sure you added environment variables in Render dashboard (not just in code)
- Make sure you redeployed after adding environment variables
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue 2: CORS errors persist
**Solution:**
- Verify `FRONTEND_URL` in backend matches your frontend URL exactly (no trailing slash)
- Check backend logs in Render to see what origin is being rejected
- Make sure both services are deployed and running

### Issue 3: Environment variables not working
**Solution:**
- In Render, environment variables must be set in the dashboard
- For Vite, variables MUST start with `VITE_` prefix
- Redeploy after adding/changing environment variables

## Quick Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend environment variables set in Render dashboard:
  - [ ] `VITE_USER_API_ENDPOINT`
  - [ ] `VITE_TWEET_API_ENDPOINT`
- [ ] Backend environment variables set in Render dashboard:
  - [ ] `FRONTEND_URL`
  - [ ] `MongoDB_URI`
  - [ ] `TOKENSECRET`
- [ ] Both services redeployed
- [ ] Tested in browser

## Example Render Environment Variables

### Frontend Service:
```
VITE_USER_API_ENDPOINT=https://blogapp-backend.onrender.com/api/v1/user
VITE_TWEET_API_ENDPOINT=https://blogapp-backend.onrender.com/api/v1/tweet
```

### Backend Service:
```
FRONTEND_URL=https://blogapp-1-kbr8.onrender.com
MongoDB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
TOKENSECRET=your_random_secret_key_here
PORT=10000
```

## Need Help?

If still having issues:
1. Check Render logs for both services
2. Verify URLs match exactly (no typos, correct protocol https://)
3. Check browser console for specific error messages
4. Ensure MongoDB Atlas allows connections from Render IPs

