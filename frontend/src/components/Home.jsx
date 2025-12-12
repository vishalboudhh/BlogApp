import { useState } from 'react'
import { useSelector } from 'react-redux'
import useOtherUser from '../hooks/useOtherUsers'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router-dom'
import useGetMyTweets from '../hooks/useGetMyTweet'
import { useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'

const Home = () => {
  const {user} = useSelector(store=>store.user);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //custom hook
  useOtherUser(user?._id);
  const isFeedRoute = location.pathname === "/";
  useGetMyTweets(user?._id, isFeedRoute);
  
  return (
    <div className='mt-4 md:mt-8 flex flex-col md:flex-row justify-between w-full md:w-[95%] lg:w-[90%] xl:w-[80%] mx-auto px-2 md:px-4 lg:px-0'>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className='md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-white'
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Left Sidebar - Hidden on mobile, shown on desktop */}
      <div className={`${isMobileMenuOpen ? 'fixed inset-0 z-40' : 'hidden'} md:block md:relative md:z-auto`}>
        <div className={`${isMobileMenuOpen ? 'w-[70%] sm:w-[60%]' : ''} md:w-[20%] h-full md:h-auto bg-gray-900 md:bg-transparent`}>
          <LeftSidebar setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>
        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div 
            className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className='w-full md:w-[60%] lg:w-[55%] xl:w-[60%]'>
        <Outlet />
      </div>

      {/* Right Sidebar - Hidden on mobile/tablet, shown on desktop */}
      <div className='hidden lg:block lg:w-[20%] xl:w-[20%]'>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home
