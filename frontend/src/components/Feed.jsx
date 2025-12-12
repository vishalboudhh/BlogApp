import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

const Feed = () => {
  const {tweets} = useSelector(store=>store.tweet);
  return (
    <div className='w-full border border-gray-700 flex flex-col max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-6rem)] mb-2'>
      <div className='shrink-0'>
        <CreatePost/>
      </div>
      <div className='flex-1 overflow-y-auto overflow-x-hidden min-h-0 pb-4 hide-scrollbar'>
        {
          tweets?.length > 0 ? (
            tweets.map((tweet) => <Tweet key={tweet?._id} tweet={tweet} />)
          ) : (
            <p className='p-4 text-center text-gray-400 text-sm md:text-base'>No tweets to show</p>
          )
        }
      </div>
    </div>
  )
}

export default Feed
