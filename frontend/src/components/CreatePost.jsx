import React, { useState } from 'react'
import Avatar from 'react-avatar'
import toast from "react-hot-toast"
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_ENDPOINT } from '../utils/constant';
import {useDispatch, useSelector} from "react-redux"
import { getIsActive, getRefresh } from '../redux/tweetSlice';
const CreatePost = () => {
    const [description, setDescription] = useState("");
    const {user} = useSelector(store=>store.user);
    const {isActive} = useSelector(store=>store.tweet);
    const dispatch = useDispatch();

    const submitHandler = async () => {
        try {
            const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, { description, id:user?._id }, {
                withCredentials: true,
            });
            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

        }
        setDescription("");
    }

   const  forYouHandler = () =>{
        dispatch(getIsActive(true));
   }

   const  followingHandler = () =>{
    dispatch(getIsActive(false));
   }

    return (
        <div className='w-full'>
            <div className='m-2 md:m-3'>
                <div className='flex items-center justify-evenly p-2 md:p-4 border-b border-gray-700'>
                    <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-500":null} cursor-pointer hover:bg-gray-800 hover:rounded-2xl w-full p-2 md:p-3`}>
                        <h1 className='text-center font-semibold text-gray-300 text-sm md:text-lg'>For You</h1>
                    </div>
                    <div onClick={followingHandler}  className={`${!isActive ? "border-b-4 border-blue-500":null} cursor-pointer hover:bg-gray-800 hover:rounded-2xl w-full p-2 md:p-3`}>
                        <h1 className='text-center font-semibold text-gray-300 text-sm md:text-lg'>Following</h1>
                    </div>
                </div>

                <div>
                    <div className='flex items-center p-3 md:p-4'>
                        <div className='shrink-0'>
                            <Avatar src={`https://vishalmeshram.vercel.app/assets/profile-DauhVDqg.jpg`} size="40" round={true} alt='img' />
                        </div>
                        <input 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className='border-none w-full outline-none ml-2 md:ml-3 text-sm md:text-lg bg-transparent' 
                            type="text" 
                            placeholder={`what's on your mind`} 
                        />
                    </div>
                    <div className='flex items-center justify-between p-3 md:p-4 border-b border-gray-700'>
                        <div className='text-lg md:text-xl'>
                            <CiImageOn />
                        </div>
                        <button onClick={submitHandler} className='cursor-pointer bg-sky-500 hover:bg-sky-700 rounded-2xl text-sm md:text-lg px-4 md:px-6 py-1 md:py-2 border border-none'>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
