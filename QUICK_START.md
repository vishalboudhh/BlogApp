# Quick Start Guide - Local Development

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

## Setup Steps

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Backend Setup

1. Create `backend/.env` file:
```env
MongoDB_URI=your_mongodb_connection_string
TOKENSECRET=your_random_secret_key_here
PORT=8080
FRONTEND_URL=http://localhost:5173
```

2. Start backend:
```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:8080`

### 3. Frontend Setup

1. Create `frontend/.env` file (optional for local dev):
```env
VITE_USER_API_ENDPOINT=http://localhost:8080/api/v1/user
VITE_TWEET_API_ENDPOINT=http://localhost:8080/api/v1/tweet
```

2. Start frontend:
```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Access the App

Open `http://localhost:5173` in your browser.

---

## Generate Secret Key

For `TOKENSECRET`, generate a secure random string:

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Using OpenSSL:**
```bash
openssl rand -hex 32
```

---

## MongoDB Atlas Setup (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Create database user
5. Whitelist IP: `0.0.0.0/0` (for development)
6. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

---

## Troubleshooting

- **Port already in use**: Change PORT in backend/.env
- **CORS errors**: Ensure FRONTEND_URL matches your frontend URL
- **Database connection**: Check MongoDB_URI format and network access
- **Module not found**: Run `npm install` in both folders

