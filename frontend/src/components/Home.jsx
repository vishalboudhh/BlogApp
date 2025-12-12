import { useSelector } from 'react-redux'
import useOtherUser from '../hooks/useOtherUsers'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router-dom'
import useGetMyTweets from '../hooks/useGetMyTweet'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector(store=>store.user);
  const location = useLocation();
  //custom hook
  useOtherUser(user?._id);
  const isFeedRoute = location.pathname === "/";
  useGetMyTweets(user?._id, isFeedRoute);
  return (
    <div className='mt-8 flex justify-between w-[80%] mx-auto'>
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  )
}

export default Home
