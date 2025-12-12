import React from 'react'
import logo from '../assets/Home.webp'
import { IoMdHome } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';

const LeftSidebar = () => {
  const { user } = useSelector(store => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true
      });
      dispatch(logoutUser());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      dispatch(logoutUser());
      navigate('/login');
    }
  };
     
  return (
    <div className='w-[20%]'>

      <div>

        <div>
          <img className="w-[150px] ml-4" src={logo} />
          <h1 className="text-xl ml-6 font-bold hover:cursor-pointer">
            <span className="bg-linear-to-r from-sky-700 to-purple-500 bg-clip-text text-transparent">Social</span>
            <span className="bg-linear-to-r from-purple-800 to-red-500 bg-clip-text text-transparent">Blogs</span>
          </h1>

        </div>

        <div className='my-4'>

          <Link to={"/"} className='flex items-center gap-1 px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <IoMdHome className='size-8' />
            </div>
            <h1 className='font-semibold text-lg'>Home</h1>
          </Link>

          <div className='flex items-center gap-1 px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <MdExplore className='size-8' />
            </div>
            <h1 className='font-semibold text-lg'>Explore</h1>
          </div>
          <div className='flex items-center gap-1 px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <IoNotifications className='size-8' />
            </div>
            <h1 className='font-semibold text-lg'>Notifications</h1>
          </div>
          <Link to={`/profile/${user?._id}`} className='flex items-center gap-1 px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <FaUser className='size-8' />
            </div>
            <h1 className='font-semibold text-lg'>Profile</h1>
          </Link>

          <Link to={`/bookmarks`} className='flex items-center gap-1 px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <FaBookmark className='size-8' />
            </div>
            <h1 className='font-semibold text-lg'>Bookmark</h1>
          </Link>

          <div onClick={handleLogout} className='mb-5 flex items-center gap-1 px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <IoLogOutSharp className='size-8' />
            </div>
            <h1 className='font-semibold text-lg'>Logout</h1>
          </div>

          <button className='w-45 py-2 border-none font-medium bg-sky-500 rounded-2xl hover:cursor-pointer hover:bg-cyan-700'>Post</button>

        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
