import React, { useState, useEffect } from 'react'
import Avatar from 'react-avatar'
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { TWEET_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"
import { getRefresh } from '../redux/tweetSlice';
import { getUser } from '../redux/userSlice';

const Tweet = ({ tweet }) => {
    const likes = tweet?.like?.length || 0;
    const authorName = tweet?.userId?.name || 'Unknown';
    const authorUsername = tweet?.userId?.username || '';
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (user?.bookmark && tweet?._id) {
            setIsBookmarked(user.bookmark.includes(tweet._id));
        }
    }, [user?.bookmark, tweet?._id]);

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            dispatch(getRefresh())
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const deleteTweetHandler = async(id) =>{
        try {
            axios.defaults.withCredentials = true;
            const res =  await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            
        }
    }

    const bookmarkHandler = async (tweetId) => {
        if (!user?._id) {
            toast.error('Please login to bookmark');
            return;
        }
        try {
            const res = await axios.put(`${USER_API_ENDPOINT}/bookmark/${tweetId}`, { id: user._id }, {
                withCredentials: true
            });
            // Refresh user data to get updated bookmark list
            const userRes = await axios.get(`${USER_API_ENDPOINT}/me`, {
                withCredentials: true
            });
            if (userRes.data.success && userRes.data.user) {
                dispatch(getUser(userRes.data.user));
            }
            dispatch(getRefresh());
            setIsBookmarked(!isBookmarked);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to bookmark');
            console.log(error);
        }
    }

    return (
        <div className='border border-gray-700'>
            <div>
                <div className='flex p-3 md:p-4'>
                    <div className='shrink-0'>
                        <Avatar src={tweet?.userId?.profilePicture || `https://vishalmeshram.vercel.app/assets/profile-DauhVDqg.jpg`} size="40" round={true} alt='img' />
                    </div>
                    <div className='w-full ml-2 md:ml-2 min-w-0'>
                        <div className='flex items-center flex-wrap'>
                            <h1 className='font-semibold text-sm md:text-lg truncate'>{authorName}</h1>
                            {authorUsername && <p className='text-gray-300 text-xs md:text-lg ml-1 truncate'>@{authorUsername}</p>}
                        </div>
                        <div className='my-2 md:my-4'>
                            <p className='text-sm md:text-base wrap-break-word'>{tweet?.description}</p>
                        </div>
                        <div className='flex justify-between gap-2 md:gap-3 flex-wrap'>
                            <div className='flex items-center gap-1 md:gap-2'>
                                <div className='cursor-pointer p-1.5 md:p-2 hover:rounded-2xl hover:bg-green-800'>
                                    <FaComment className='text-sm md:text-base' />
                                </div>
                                <p className='text-xs md:text-sm'>{tweet?.comments?.length || 0}</p>
                            </div>
                            <div className='flex items-center gap-1 md:gap-2'>
                                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='cursor-pointer p-1.5 md:p-2 hover:rounded-2xl hover:bg-red-800'>
                                    <FaHeart className='text-sm md:text-base' />
                                </div>
                                <p className='text-xs md:text-sm'>{likes}</p>
                            </div>
                            <div className='flex items-center gap-1 md:gap-2'>
                                <div onClick={() => bookmarkHandler(tweet?._id)} className={`cursor-pointer p-1.5 md:p-2 hover:rounded-2xl hover:bg-sky-800 ${isBookmarked ? 'text-yellow-400' : ''}`}>
                                    <FaBookmark className='text-sm md:text-base' />
                                </div>
                            </div>
                            {
                                user?._id === tweet.userId._id && (
                                    <div onClick={()=>deleteTweetHandler(tweet?._id)} className='flex items-center gap-1 md:gap-2'>
                                        <div className='cursor-pointer p-1.5 md:p-2 hover:rounded-2xl hover:opacity-60 hover:bg-red-800'>
                                            <MdDelete size={18} className='md:w-5 md:h-5' />
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet
