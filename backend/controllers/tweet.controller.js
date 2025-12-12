import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { transformUser, transformTweets } from "../utils/imageUrlHelper.js";

export const createTweet = async (req, res, next) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId: id,
            userDetails:user
        })

        return res.status(201).json({
            message: "Blog created successfully",
            success: true
        });

    } catch (error) {
        next(error);
    }
};

export const deleteTweet = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Blog deleted successfully",
            success: true
        })
    } catch (error) {
        next(error)
    }
};

export const likeOrDislike = async (req, res, next) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);

        if (tweet.like.includes(loggedInUserId)) {
            //dislike
            await Tweet.findByIdAndUpdate(tweetId, {$pull: { like: loggedInUserId } });
            return res.status(200).json({
                message: "This blog is disliked",
                success: true
            })
        } else {
            //like
            await Tweet.findByIdAndUpdate(tweetId, {$push: { like: loggedInUserId } });
            return res.status(200).json({
                message: "This blog is liked",
                success: true
            })
        }
    } catch (error) {
        next(error)
    }
};

export const getAllTweets = async (req, res, next) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);

        const loggedInUserTweets = await Tweet.find({ userId: id }).populate('userId');

        
        const followingUserTweet = await Promise.all(
            loggedInUser.following
                .map(uid => Tweet.find({ userId: uid }).populate('userId'))
        ).then(results => results.flat());

        const allTweets = loggedInUserTweets.concat(...followingUserTweet);
        const transformedTweets = transformTweets(allTweets.map(t => t.toObject ? t.toObject() : t));
        return res.status(200).json({
            tweets: transformedTweets
        });
    } catch (error) {
        next(error);
    }
};

export const getUserTweets = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tweets = await Tweet.find({ userId: id }).populate('userId');
        const transformedTweets = transformTweets(tweets.map(t => t.toObject ? t.toObject() : t));
        return res.status(200).json({ tweets: transformedTweets });
    } catch (error) {
        next(error);
    }
};


export const getFollowingTweet = async(req,res,next) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);


        
        const followingUserTweet = await Promise.all(
            loggedInUser.following.map(uid => Tweet.find({ userId: uid }).populate('userId'))
        ).then(results => results.flat());

        const transformedTweets = transformTweets(followingUserTweet.map(t => t.toObject ? t.toObject() : t));
        return res.status(200).json({
            tweets: transformedTweets
        });
    } catch (error) {
        next(error)
    }
};

export const getBookmarkedTweets = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const bookmarkIds = user.bookmark || [];
        const bookmarkedTweets = await Tweet.find({ _id: { $in: bookmarkIds } }).populate('userId', 'name username profilePicture');
        const transformedTweets = transformTweets(bookmarkedTweets.map(t => t.toObject ? t.toObject() : t));
        return res.status(200).json({ tweets: transformedTweets });
    } catch (error) {
        next(error);
    }
};

