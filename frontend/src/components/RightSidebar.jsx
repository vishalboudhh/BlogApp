import Avatar from 'react-avatar';
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
const RightSidebar = () => {
  const { otherUsers } = useSelector(store => store.user);
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!query) return otherUsers;
    const q = query.toLowerCase();
    return otherUsers?.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q)
    );
  }, [otherUsers, query]);

  return (
    <div className='w-full lg:w-[20%] ml-0 lg:ml-5'>
      <div className='flex items-center p-2 bg-gray-800 outline-none rounded mt-2 mx-2 lg:mx-0'>
        <FaSearch className='text-gray-400' />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='bg-transparent px-2 outline-none w-full text-sm'
          placeholder='search'
        />
      </div>

      <div className='p-2 lg:p-4'>
        <h1 className='text-center my-2 text-base lg:text-lg font-semibold'>Who to follow</h1>

        {filteredUsers?.length ? filteredUsers.slice(0, 5).map((user) => (
          <div key={user._id} className='flex flex-col sm:flex-row items-start sm:items-center justify-between my-2 p-2 bg-gray-900 rounded-2xl'>
            <div className='flex gap-2 items-center flex-1 min-w-0'>
              <Avatar src={user.profilePicture || `https://vishalmeshram.vercel.app/assets/profile-DauhVDqg.jpg`} size="40" round={true} alt='img' />
              <div className='flex flex-col min-w-0'>
                <h1 className='font-bold text-sm truncate'>{user.name}</h1>
                <p className='font-semibold text-xs text-gray-400 truncate'>@{user.username}</p>
              </div>
            </div>
            <div className='mt-2 sm:mt-0 sm:ml-2'>
              <Link to={`/profile/${user?._id}`}>
                <button className='cursor-pointer rounded-2xl bg-sky-500 px-4 py-1 text-xs sm:text-sm whitespace-nowrap'>Profile</button>
              </Link>
            </div>
          </div>
        )) : (
          <p className='text-center text-gray-500 mt-3 text-sm'>No users found</p>
        )}

      </div>
    </div>
  )
}

export default RightSidebar
