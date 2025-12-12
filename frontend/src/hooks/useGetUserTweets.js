import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
import { TWEET_API_ENDPOINT } from "../utils/constant";

const useGetUserTweets = (userId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_ENDPOINT}/user/${userId}`, {
                    withCredentials: true
                });
                dispatch(getAllTweets(res.data.tweets));
            } catch (error) {
                console.log(error);
            }
        };
        if (userId) {
            fetchTweets();
        }
    }, [userId, dispatch]);
};

export default useGetUserTweets;

