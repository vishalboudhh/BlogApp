/**
 * Helper function to fix image URLs
 * Replaces localhost URLs with the correct backend URL from environment variables
 */
export const fixImageUrl = (url) => {
    if (!url) return url;
    
    // If URL contains localhost, replace with backend URL
    if (url.includes('localhost:8080') || url.includes('localhost')) {
        const backendUrl = process.env.BACKEND_URL || process.env.BACKEND_BASE_URL;
        if (backendUrl) {
            // Extract the path after /uploads
            const pathMatch = url.match(/\/uploads\/.*$/);
            if (pathMatch) {
                return `${backendUrl}${pathMatch[0]}`;
            }
        }
    }
    
    return url;
};

/**
 * Transform user object to fix image URLs
 */
export const transformUser = (user) => {
    if (!user) return user;
    
    if (typeof user === 'object') {
        if (user.profilePicture) {
            user.profilePicture = fixImageUrl(user.profilePicture);
        }
        
        // Handle userDetails array in tweets
        if (Array.isArray(user.userDetails) && user.userDetails.length > 0) {
            user.userDetails = user.userDetails.map(u => ({
                ...u,
                profilePicture: fixImageUrl(u.profilePicture)
            }));
        }
    }
    
    return user;
};

/**
 * Transform array of users
 */
export const transformUsers = (users) => {
    if (!users || !Array.isArray(users)) return users;
    return users.map(transformUser);
};

/**
 * Transform tweet object to fix image URLs in userDetails and userId
 */
export const transformTweet = (tweet) => {
    if (!tweet) return tweet;
    
    const tweetObj = tweet.toObject ? tweet.toObject() : tweet;
    
    // Transform userId if it's populated
    if (tweetObj.userId && typeof tweetObj.userId === 'object') {
        tweetObj.userId = transformUser(tweetObj.userId);
    }
    
    // Transform userDetails array
    if (Array.isArray(tweetObj.userDetails) && tweetObj.userDetails.length > 0) {
        tweetObj.userDetails = tweetObj.userDetails.map(u => ({
            ...u,
            profilePicture: fixImageUrl(u.profilePicture)
        }));
    }
    
    return tweetObj;
};

/**
 * Transform array of tweets
 */
export const transformTweets = (tweets) => {
    if (!tweets || !Array.isArray(tweets)) return tweets;
    return tweets.map(transformTweet);
};

