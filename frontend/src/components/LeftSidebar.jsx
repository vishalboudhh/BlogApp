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

const LeftSidebar = ({ setIsMobileMenuOpen }) => {
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

  const handleLinkClick = () => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
     
  return (
    <div className='w-full h-full md:h-auto p-4 md:p-0'>

      <div>

        <div className='mb-4 md:mb-0'>
          <img className="w-[120px] md:w-[150px] ml-2 md:ml-4" src={logo} alt="logo" />
          <h1 className="text-lg md:text-xl ml-4 md:ml-6 font-bold hover:cursor-pointer">
            <span className="bg-linear-to-r from-sky-700 to-purple-500 bg-clip-text text-transparent">Social</span>
            <span className="bg-linear-to-r from-purple-800 to-red-500 bg-clip-text text-transparent">Blogs</span>
          </h1>

        </div>

        <div className='my-4 space-y-1'>

          <Link to={"/"} onClick={handleLinkClick} className='flex items-center gap-2 md:gap-1 px-3 md:px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <IoMdHome className='size-6 md:size-8' />
            </div>
            <h1 className='font-semibold text-base md:text-lg'>Home</h1>
          </Link>

          <div className='flex items-center gap-2 md:gap-1 px-3 md:px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <MdExplore className='size-6 md:size-8' />
            </div>
            <h1 className='font-semibold text-base md:text-lg'>Explore</h1>
          </div>
          <div className='flex items-center gap-2 md:gap-1 px-3 md:px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <IoNotifications className='size-6 md:size-8' />
            </div>
            <h1 className='font-semibold text-base md:text-lg'>Notifications</h1>
          </div>
          <Link to={`/profile/${user?._id}`} onClick={handleLinkClick} className='flex items-center gap-2 md:gap-1 px-3 md:px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <FaUser className='size-6 md:size-8' />
            </div>
            <h1 className='font-semibold text-base md:text-lg'>Profile</h1>
          </Link>

          <Link to={`/bookmarks`} onClick={handleLinkClick} className='flex items-center gap-2 md:gap-1 px-3 md:px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <FaBookmark className='size-6 md:size-8' />
            </div>
            <h1 className='font-semibold text-base md:text-lg'>Bookmark</h1>
          </Link>

          <div onClick={handleLogout} className='mb-5 flex items-center gap-2 md:gap-1 px-3 md:px-4 py-2 hover:bg-gray-800 hover:cursor-pointer rounded-2xl'>
            <div>
              <IoLogOutSharp className='size-6 md:size-8' />
            </div>
            <h1 className='font-semibold text-base md:text-lg'>Logout</h1>
          </div>

          <button className='w-full md:w-auto px-6 py-2 border-none font-medium bg-sky-500 rounded-2xl hover:cursor-pointer hover:bg-cyan-700 text-sm md:text-base'>Post</button>

        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
