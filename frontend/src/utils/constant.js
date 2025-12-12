// Debug: Log environment variables (remove in production if needed)
console.log('Environment Variables:', {
  VITE_USER_API_ENDPOINT: import.meta.env.VITE_USER_API_ENDPOINT,
  VITE_TWEET_API_ENDPOINT: import.meta.env.VITE_TWEET_API_ENDPOINT,
  MODE: import.meta.env.MODE
});

export const USER_API_ENDPOINT = import.meta.env.VITE_USER_API_ENDPOINT || "http://localhost:8080/api/v1/user";
export const TWEET_API_ENDPOINT = import.meta.env.VITE_TWEET_API_ENDPOINT || "http://localhost:8080/api/v1/tweet";

// Debug: Log final endpoints being used
console.log('API Endpoints:', {
  USER_API_ENDPOINT,
  TWEET_API_ENDPOINT
});
