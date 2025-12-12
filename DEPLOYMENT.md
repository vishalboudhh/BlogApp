# Deployment Guide for BlogApp

This guide will help you deploy your BlogApp to production. The app consists of:
- **Backend**: Node.js/Express API
- **Frontend**: React/Vite application
- **Database**: MongoDB

## Prerequisites

1. MongoDB Atlas account (free tier available) or MongoDB instance
2. GitHub account (for version control)
3. Accounts on deployment platforms:
   - **Backend**: Railway, Render, or Heroku
   - **Frontend**: Vercel or Netlify

---

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (username/password)
4. Whitelist IP addresses (add `0.0.0.0/0` for all IPs during development)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

---

## Step 2: Prepare Backend for Deployment

### 2.1 Update Environment Variables

Create a `.env` file in the `backend` folder:

```env
MongoDB_URI=your_mongodb_atlas_connection_string
TOKENSECRET=your_strong_random_secret_key_here
PORT=8080
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Generate a secure TOKENSECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.2 Test Backend Locally

```bash
cd backend
npm install
npm start
```

---

## Step 3: Deploy Backend

### Option A: Railway (Recommended - Easy & Free Tier Available)

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set root directory to `backend`
6. Add environment variables:
   - `MongoDB_URI`
   - `TOKENSECRET`
   - `PORT` (Railway will auto-assign, but you can set it)
   - `FRONTEND_URL` (your frontend URL - update after deploying frontend)
7. Railway will auto-detect Node.js and deploy
8. Copy the deployment URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. Go to [Render](https://render.com)
2. Sign up and create a new "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add environment variables (same as Railway)
6. Deploy and copy the URL

### Option C: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MongoDB_URI=your_connection_string
   heroku config:set TOKENSECRET=your_secret
   heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
   ```
5. Deploy: `git push heroku main`

---

## Step 4: Prepare Frontend for Deployment

### 4.1 Update Environment Variables

Create a `.env.production` file in the `frontend` folder:

```env
VITE_USER_API_ENDPOINT=https://your-backend-url.railway.app/api/v1/user
VITE_TWEET_API_ENDPOINT=https://your-backend-url.railway.app/api/v1/tweet
```

Replace `your-backend-url.railway.app` with your actual backend URL.

### 4.2 Test Frontend Build Locally

```bash
cd frontend
npm install
npm run build
npm run preview
```

---

## Step 5: Deploy Frontend

### Option A: Vercel (Recommended - Best for Vite)

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables:
   - `VITE_USER_API_ENDPOINT`
   - `VITE_TWEET_API_ENDPOINT`
7. Deploy
8. Copy your frontend URL (e.g., `https://your-app.vercel.app`)

### Option B: Netlify

1. Go to [Netlify](https://netlify.com)
2. Sign up and click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variables (same as Vercel)
6. Deploy

---

## Step 6: Update CORS and Environment Variables

### 6.1 Update Backend CORS

After deploying frontend, update your backend's `FRONTEND_URL` environment variable to your frontend URL:

**On Railway/Render:**
- Go to your backend project settings
- Update `FRONTEND_URL` to `https://your-frontend.vercel.app`
- Redeploy if needed

### 6.2 Update Frontend API Endpoints

If you didn't set environment variables during deployment:
- Go to your frontend project settings (Vercel/Netlify)
- Add/update environment variables
- Redeploy

---

## Step 7: File Uploads (Important!)

Your backend serves uploaded files from the `uploads` folder. For production:

### Option 1: Use Cloud Storage (Recommended)
- **AWS S3**, **Cloudinary**, or **Firebase Storage**
- Update your backend to upload files to cloud storage instead of local filesystem

### Option 2: Keep Local Storage (Simple but Limited)
- Railway/Render will persist files, but they may be lost on redeploy
- Consider mounting a volume (Railway Pro) or using persistent storage

### Quick Cloudinary Setup (Optional):

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Install: `npm install cloudinary multer-storage-cloudinary`
3. Update your upload middleware to use Cloudinary
4. Store image URLs in database instead of file paths

---

## Step 8: Testing Production

1. Visit your frontend URL
2. Test:
   - User registration/login
   - Creating tweets
   - Bookmarking tweets
   - Profile updates
   - File uploads

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your frontend domain exactly
- Check for trailing slashes
- Verify credentials are enabled

### API Not Found
- Check environment variables are set correctly
- Ensure backend is running (check logs)
- Verify API endpoint URLs in frontend

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has proper permissions

### File Upload Issues
- Check uploads folder permissions
- Verify file size limits
- Consider using cloud storage for production

---

## Environment Variables Summary

### Backend (.env)
```
MongoDB_URI=mongodb+srv://...
TOKENSECRET=your_secret_key
PORT=8080
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env.production)
```
VITE_USER_API_ENDPOINT=https://your-backend.railway.app/api/v1/user
VITE_TWEET_API_ENDPOINT=https://your-backend.railway.app/api/v1/tweet
```

---

## Quick Deploy Commands

### Backend (Railway)
```bash
cd backend
# Push to GitHub, Railway auto-deploys
```

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
# Or connect GitHub for auto-deploy
```

---

## Cost Estimate

- **MongoDB Atlas**: Free tier (512MB)
- **Railway**: Free tier ($5 credit/month)
- **Vercel**: Free tier (unlimited for personal projects)
- **Total**: $0/month for small projects

---

## Next Steps

1. Set up custom domains (optional)
2. Enable HTTPS (automatic on Vercel/Railway)
3. Set up monitoring/logging
4. Configure backups for MongoDB
5. Implement rate limiting for API
6. Add error tracking (Sentry)

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints with Postman/Thunder Client
4. Check browser console for frontend errors

Good luck with your deployment! 🚀

