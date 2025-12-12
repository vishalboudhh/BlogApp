# How to Set Environment Variables in Render.com

## ⚠️ CRITICAL: Vite Environment Variables Must Be Set BEFORE Building

**Important:** Vite embeds environment variables at BUILD TIME, not runtime. If you set env vars after deployment, you MUST rebuild/redeploy!

---

## Step-by-Step Instructions

### Step 1: Get Your Backend URL

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Backend** service
3. Copy the URL from the top (e.g., `https://blogapp-backend-abc123.onrender.com`)
4. **Note:** Make sure it starts with `https://` and has no trailing slash

---

### Step 2: Set Frontend Environment Variables

1. Go to your **Frontend** service in Render dashboard
2. Click on **Environment** tab (left sidebar)
3. Click **Add Environment Variable** button
4. Add these **TWO** variables one by one:

#### Variable 1:
- **Key:** `VITE_USER_API_ENDPOINT`
- **Value:** `https://YOUR-BACKEND-URL.onrender.com/api/v1/user`
- Click **Save**

#### Variable 2:
- **Key:** `VITE_TWEET_API_ENDPOINT`
- **Value:** `https://YOUR-BACKEND-URL.onrender.com/api/v1/tweet`
- Click **Save**

**Example:**
```
VITE_USER_API_ENDPOINT=https://blogapp-backend-abc123.onrender.com/api/v1/user
VITE_TWEET_API_ENDPOINT=https://blogapp-backend-abc123.onrender.com/api/v1/tweet
```

---

### Step 3: Set Backend Environment Variables

1. Go to your **Backend** service in Render dashboard
2. Click on **Environment** tab
3. Add/Update these variables:

#### Variable 1:
- **Key:** `FRONTEND_URL`
- **Value:** `https://blogapp-1-kbr8.onrender.com`
- (Replace with your actual frontend URL, no trailing slash)

#### Other Required Variables:
- **Key:** `MongoDB_URI`
- **Value:** Your MongoDB connection string

- **Key:** `TOKENSECRET`
- **Value:** Your JWT secret key

- **Key:** `PORT`
- **Value:** `10000` (or leave Render to auto-assign)

---

### Step 4: MANUALLY TRIGGER REDEPLOY

**This is the most important step!**

After adding environment variables:

1. Go to your **Frontend** service
2. Click on **Manual Deploy** → **Deploy latest commit**
3. Wait for deployment to complete (2-5 minutes)

4. Go to your **Backend** service
5. Click on **Manual Deploy** → **Deploy latest commit**
6. Wait for deployment to complete

**Why?** Render doesn't always auto-redeploy when you add env vars. You MUST manually redeploy!

---

### Step 5: Verify It Works

1. Open your frontend URL: `https://blogapp-1-kbr8.onrender.com`
2. Open browser console (F12)
3. Look for these logs:
   ```
   Environment Variables: {
     VITE_USER_API_ENDPOINT: "https://your-backend.onrender.com/api/v1/user",
     VITE_TWEET_API_ENDPOINT: "https://your-backend.onrender.com/api/v1/tweet"
   }
   ```
4. If you see `undefined` or `localhost`, the env vars weren't set correctly
5. Check Network tab - API calls should go to your Render backend URL

---

## Common Mistakes

### ❌ Mistake 1: Setting env vars but not redeploying
**Fix:** Always manually redeploy after adding env vars

### ❌ Mistake 2: Wrong variable names
**Fix:** Must be exactly `VITE_USER_API_ENDPOINT` and `VITE_TWEET_API_ENDPOINT` (case-sensitive)

### ❌ Mistake 3: Using http instead of https
**Fix:** Render uses HTTPS, so use `https://` in all URLs

### ❌ Mistake 4: Trailing slashes
**Fix:** Don't add trailing slash: `https://backend.onrender.com` ✅ (not `https://backend.onrender.com/` ❌)

### ❌ Mistake 5: Setting in code instead of Render dashboard
**Fix:** Environment variables MUST be set in Render dashboard, not in `.env` files (those are gitignored)

---

## Quick Checklist

- [ ] Got backend URL from Render dashboard
- [ ] Set `VITE_USER_API_ENDPOINT` in Frontend service
- [ ] Set `VITE_TWEET_API_ENDPOINT` in Frontend service
- [ ] Set `FRONTEND_URL` in Backend service
- [ ] Set `MongoDB_URI` in Backend service
- [ ] Set `TOKENSECRET` in Backend service
- [ ] **Manually redeployed Frontend**
- [ ] **Manually redeployed Backend**
- [ ] Checked browser console for correct URLs
- [ ] Tested login/create post functionality

---

## Still Not Working?

1. **Check Render Logs:**
   - Go to your Frontend service → Logs tab
   - Look for build errors or warnings

2. **Verify Environment Variables:**
   - Go to Frontend service → Environment tab
   - Make sure variables are exactly as shown (copy-paste to avoid typos)

3. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open in incognito/private window

4. **Check Build Output:**
   - In Render logs, search for "VITE_" to see if env vars were found during build

5. **Verify URLs Match:**
   - Frontend URL in backend's `FRONTEND_URL` must match exactly
   - Backend URL in frontend's env vars must match exactly

---

## Example Configuration

### Frontend Service Environment Variables:
```
VITE_USER_API_ENDPOINT=https://blogapp-backend-xyz.onrender.com/api/v1/user
VITE_TWEET_API_ENDPOINT=https://blogapp-backend-xyz.onrender.com/api/v1/tweet
```

### Backend Service Environment Variables:
```
FRONTEND_URL=https://blogapp-1-kbr8.onrender.com
MongoDB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
TOKENSECRET=your_random_secret_key_here
PORT=10000
```

---

## Need More Help?

If still having issues, check:
1. Render deployment logs for errors
2. Browser console for the debug logs we added
3. Network tab to see what URLs are being called
4. Backend logs to see CORS errors

