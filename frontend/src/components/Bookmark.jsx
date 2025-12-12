import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { TWEET_API_ENDPOINT } from '../utils/constant'
import Tweet from './Tweet'

const Bookmark = () => {
  const { user } = useSelector(store => store.user)
  const refresh = useSelector(store => store.tweet.refresh)
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?._id) return;
      setLoading(true)
      try {
        const res = await axios.get(`${TWEET_API_ENDPOINT}/bookmarks/${user._id}`, { withCredentials: true })
        setTweets(res.data.tweets || [])
      } catch (error) {
        console.error('Error fetching bookmarks', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBookmarks()
  }, [user, refresh])

  if (loading) return <p className='p-4 text-sm md:text-base'>Loading...</p>
  if (!tweets || tweets.length === 0) return <p className='p-4 text-gray-400 text-sm md:text-base'>No bookmarks yet</p>

  return (
    <div className='w-full md:w-[70%] lg:w-[60%] border border-gray-700'>
      <div className='p-3 md:p-4'>
        <h1 className='font-bold text-lg md:text-xl mb-4'>Bookmarks</h1>
        {tweets.map((t) => (
          <Tweet key={t._id} tweet={t} />
        ))}
      </div>
    </div>
  )
}

export default Bookmark
