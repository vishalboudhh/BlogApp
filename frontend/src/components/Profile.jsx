import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import useGetProfile from '../hooks/useGetProfile';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import Tweet from './Tweet';
import useGetUserTweets from '../hooks/useGetUserTweets';
import { getMyProfile, getUser, updateUserAndProfile } from '../redux/userSlice';

const Profile = () => {

    const { user, profile } = useSelector(store => store.user)
    const { tweets } = useSelector(store => store.tweet)
    const dispatch = useDispatch();
    const { id } = useParams()
    useGetProfile(id);
    useGetUserTweets(id);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        setName(profile?.name || "");
        setUsername(profile?.username || "");
        setBio(profile?.bio || "");
    }, [profile]);

    const followAndUnfollowHandler = async () => {
        const isFollowing = user?.following?.includes(id);
        const endpoint = isFollowing ? "unfollow" : "follow";
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_ENDPOINT}/${endpoint}/${id}`, { id: user?._id });
            toast.success(res.data.message);
            if (res.data.loggedInUser) {
                dispatch(getUser(res.data.loggedInUser));
            }
            if (res.data.targetUser) {
                dispatch(getMyProfile(res.data.targetUser));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    const handleProfileUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("username", username);
            formData.append("bio", bio);
            if (file) {
                formData.append("profilePicture", file);
            }
            const res = await axios.put(`${USER_API_ENDPOINT}/update/${user?._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            toast.success(res.data.message);
            dispatch(updateUserAndProfile({ user: res.data.user, profile: res.data.user }));
            setIsEditing(false);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update profile");
        }
    }

    return (
        <div className='w-full md:w-[70%] lg:w-[60%] xl:w-[50%] border-l border-r border-gray-700'>
            <div className=''>
                <div className='flex items-center py-2 px-2 md:px-0'>
                    <Link to={`/`} className='p-2 rounded-full hover:bg-gray-700 hover:cursor-pointer'>
                        <IoMdArrowRoundBack size={24} />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-base md:text-lg truncate'>{profile?.name}</h1>
                        <p className='text-gray-500 text-xs md:text-sm'>10 posts</p>
                    </div>
                </div>
                <div className='relative'>
                    <img src={`https://pbs.twimg.com/profile_banners/1873023024448061442/1758299084/1080x360`} alt="profile" className='w-full h-32 md:h-48 object-cover' />
                    <div className='absolute -bottom-12 md:-bottom-16 left-2 md:left-4 border-2 md:border-4 border-white rounded-full'>
                        <Avatar src={profile?.profilePicture || `https://vishalmeshram.vercel.app/assets/profile-DauhVDqg.jpg`} round={true} size={80} style={{ width: '80px', height: '80px' }} className='md:!w-[100px] md:!h-[100px]' />
                    </div>
                </div>
                <div className='text-right px-2 md:px-0 mt-14 md:mt-16'>
                    {
                        profile?._id === user?._id ? (
                            <button onClick={() => setIsEditing(!isEditing)} className='px-3 md:px-4 py-1 my-2 rounded-full hover:bg-sky-800 bg-sky-500 border-gray-400 text-sm md:text-base'>{isEditing ? "Close" : "Edit Profile"}</button>
                        ) : (
                            <button onClick={followAndUnfollowHandler} className='px-3 md:px-4 py-1 my-2 rounded-full hover:bg-sky-800 bg-sky-500 border-gray-400 text-sm md:text-base'>{user?.following?.includes(id) ? "Unfollow" : "Follow"}</button>

                        )
                    }
                </div>
                <div className='ml-2 md:ml-2 mt-2 md:mt-10 px-2 md:px-0'>
                    <h1 className='font-bold text-lg md:text-xl'>{profile?.name}</h1>
                    <p className='text-xs md:text-sm text-gray-400'>@{profile?.username}</p>
                </div>
                <div className='ml-2 md:ml-2 text-xs md:text-sm px-2 md:px-0'>
                    <p className='wrap-break-word'>{profile?.bio || "Add a bio to tell people more about you."}</p>
                </div>
                {isEditing && (
                    <div className='p-3 md:p-4 border-t border-gray-700 mt-4'>
                        <div className='flex flex-col gap-3'>
                            <input value={name} onChange={(e) => setName(e.target.value)} className='bg-gray-800 p-2 rounded text-sm md:text-base' placeholder='Name' />
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className='bg-gray-800 p-2 rounded text-sm md:text-base' placeholder='Username' />
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='bg-gray-800 p-2 rounded text-sm md:text-base' placeholder='Bio' rows={3} />
                            <label className='bg-blue-500 rounded-full px-4 py-2 text-center cursor-pointer text-sm md:text-base'>
                                Upload Photo
                                <input type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} className='hidden' />
                            </label>
                            <button onClick={handleProfileUpdate} className='bg-sky-600 hover:bg-sky-700 rounded-full py-2 text-sm md:text-base'>Save</button>
                        </div>
                    </div>
                )}
                <div className='mt-4'>
                    {tweets?.length ? tweets.map((tweet) => (
                        <Tweet key={tweet?._id} tweet={tweet} />
                    )) : (
                        <p className='p-4 text-center text-gray-400 text-sm md:text-base'>No tweets yet</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
