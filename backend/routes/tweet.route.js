import express from "express";
import { createTweet, deleteTweet, getAllTweets, getFollowingTweet, getUserTweets, likeOrDislike, getBookmarkedTweets } from "../controllers/tweet.controller.js";
import isAuthenticated from "../middleware/auth.js";
const router = express.Router();

router.route("/create").post(isAuthenticated,createTweet);
router.route("/delete/:id").delete(isAuthenticated,deleteTweet);
router.route("/like/:id").put(isAuthenticated,likeOrDislike);
router.route("/alltweet/:id").get(isAuthenticated,getAllTweets);
router.route("/followingtweet/:id").get(isAuthenticated,getFollowingTweet);
router.route("/user/:id").get(isAuthenticated,getUserTweets);
router.route("/bookmarks/:id").get(isAuthenticated,getBookmarkedTweets);



export default router;