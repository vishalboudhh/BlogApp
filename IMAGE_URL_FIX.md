# Image URL Fix for Production

## Problem
Images are trying to load from `http://localhost:8080/uploads/...` instead of your Render backend URL, causing CORS errors.

## Solution Implemented

### 1. Added Image URL Helper
Created `backend/utils/imageUrlHelper.js` that:
- Automatically replaces localhost URLs with the correct backend URL
- Transforms user and tweet data before sending responses
- Uses `BACKEND_URL` environment variable

### 2. Updated All Controllers
- User controllers: Transform user data before sending
- Auth controllers: Transform user data in login/me endpoints
- Tweet controllers: Transform tweets and userDetails

### 3. Fixed File Upload URL Generation
Updated `updateProfile` to use `BACKEND_URL` environment variable instead of `req.protocol` and `req.get("host")`.

## Setup Required

### Add Backend URL Environment Variable

**In Render Backend Service → Environment Tab:**

Add this variable:
```
BACKEND_URL=https://blogapp-osnb.onrender.com
```

**Important:** 
- Use your actual backend URL (no trailing slash)
- Must be HTTPS (not HTTP)
- This is the base URL where your backend is hosted

## How It Works

1. **New uploads**: Will use `BACKEND_URL` environment variable
2. **Existing URLs**: Will be automatically transformed from localhost to backend URL when returned in API responses
3. **All endpoints**: User and tweet data is automatically transformed

## After Adding Environment Variable

1. **Redeploy Backend:**
   - Go to Render → Backend service
   - Manual Deploy → Deploy latest commit
   - Wait for deployment (2-5 minutes)

2. **Test:**
   - Clear browser cache
   - Check existing images - should now load from Render backend
   - Upload new profile picture - should use correct URL

## Verification

After redeployment:
- ✅ Images load correctly (no localhost URLs)
- ✅ No CORS errors for images
- ✅ New uploads use correct backend URL
- ✅ Existing images are automatically fixed

## Example

**Before:**
```
http://localhost:8080/uploads/1765541621022-Photo.png
```

**After (automatically transformed):**
```
https://blogapp-osnb.onrender.com/uploads/1765541621022-Photo.png
```

## Troubleshooting

### Images still showing localhost?
1. Check `BACKEND_URL` is set correctly in Render
2. Verify backend was redeployed after adding env var
3. Clear browser cache
4. Check backend logs for errors

### 500 Error on Update?
- Check backend logs in Render
- Verify file upload is working
- Check `BACKEND_URL` format (no trailing slash)

