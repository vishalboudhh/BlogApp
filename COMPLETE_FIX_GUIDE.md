# Complete Fix Guide for Render Deployment

## Issues Found:
1. ❌ `VITE_TWEET_API_ENDPOINT` is undefined (still using localhost)
2. ❌ 401 Unauthorized errors (cookie configuration issue)

## Fix Both Issues:

### Issue 1: Add Missing Environment Variable

**In Render Frontend Service → Environment Tab:**

Add this variable:
```
VITE_TWEET_API_ENDPOINT=https://blogapp-osnb.onrender.com/api/v1/tweet
```

### Issue 2: Update Backend Environment Variable

**In Render Backend Service → Environment Tab:**

Make sure `FRONTEND_URL` is set correctly:
```
FRONTEND_URL=https://blogapp-1-kbr8.onrender.com
```

**Important:** No trailing slash, exact URL match!

### Issue 3: Cookie Configuration (Already Fixed in Code)

The code has been updated to handle HTTPS cookies properly. After redeploying backend, cookies will work correctly.

---

## Step-by-Step Actions:

### 1. Add Missing Frontend Env Var
1. Go to Render → Frontend service
2. Environment tab
3. Add: `VITE_TWEET_API_ENDPOINT=https://blogapp-osnb.onrender.com/api/v1/tweet`
4. Save

### 2. Verify Backend Env Var
1. Go to Render → Backend service  
2. Environment tab
3. Check `FRONTEND_URL=https://blogapp-1-kbr8.onrender.com` (no trailing slash)
4. If missing/wrong, add/update it

### 3. Commit and Push Code Changes
The cookie fix needs to be deployed:

```bash
git add .
git commit -m "Fix cookie configuration for production HTTPS"
git push
```

### 4. Redeploy Both Services
1. **Frontend:** Manual Deploy → Deploy latest commit
2. **Backend:** Manual Deploy → Deploy latest commit
3. Wait for both to complete (2-5 minutes each)

### 5. Test
1. Clear browser cache (Ctrl+Shift+R)
2. Try logging in
3. Check browser console - should see:
   ```
   VITE_TWEET_API_ENDPOINT: "https://blogapp-osnb.onrender.com/api/v1/tweet"
   ```
4. Check Network tab - no more localhost calls
5. Check cookies - should see `token` cookie set

---

## What Was Fixed:

### Cookie Configuration
- Added `secure: true` for HTTPS
- Added `sameSite: 'none'` for cross-site cookies
- Applied to both login and logout

### CORS Configuration  
- Moved CORS before other middleware
- Added better logging
- Added `exposedHeaders` for cookies

---

## Verification Checklist:

After redeployment, verify:

- [ ] Browser console shows both env vars set correctly
- [ ] No localhost URLs in Network tab
- [ ] Login works without 401 errors
- [ ] Cookies are set (check Application → Cookies in DevTools)
- [ ] Creating posts works
- [ ] All API calls go to Render backend

---

## Still Having Issues?

### Check Backend Logs:
1. Render → Backend service → Logs tab
2. Look for CORS errors or cookie issues
3. Check if `FRONTEND_URL` is being read correctly

### Check Frontend Logs:
1. Render → Frontend service → Logs tab  
2. Look for build errors
3. Verify env vars were found during build

### Debug Cookies:
1. Open DevTools → Application → Cookies
2. Should see `token` cookie after login
3. Check cookie attributes:
   - `Secure`: Should be checked (HTTPS)
   - `SameSite`: Should be `None` (cross-site)
   - `HttpOnly`: Should be checked

### Test API Directly:
```bash
# Test login
curl -X POST https://blogapp-osnb.onrender.com/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}' \
  -c cookies.txt -v

# Check if cookie was set
cat cookies.txt
```

---

## Summary:

1. ✅ Add `VITE_TWEET_API_ENDPOINT` to Frontend env vars
2. ✅ Verify `FRONTEND_URL` in Backend env vars  
3. ✅ Push code changes (cookie fix)
4. ✅ Redeploy both services
5. ✅ Test and verify

After these steps, everything should work! 🚀

