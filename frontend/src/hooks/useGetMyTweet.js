import axios from "axios"
import { TWEET_API_ENDPOINT } from "../utils/constant"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
const useGetMyTweets = (id, enabled = true) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet);
    const fetchMyTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/alltweet/${id}`, {
                withCredentials: true
            });
            console.log("[useGetMyTweets] response:", res.data);
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }
    }
    const followingTweetHandler = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/followingtweet/${id}`, {
                withCredentials: true
            });
            console.log(res);
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        if (!enabled || !id) return;
        if (isActive) {
            fetchMyTweets();
        } else {
            followingTweetHandler();
        }
    }, [id, dispatch, refresh, isActive, enabled])

};
export default useGetMyTweets;