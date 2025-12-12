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
    <div className='w-[20%] ml-5 '>
      <div className='flex ml-10 items-center p-2 bg-gray-800 outline-none rounded mt-2'>
        <FaSearch />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='bg-transparent px-2 outline-none'
          placeholder='search'
        />
      </div>

      <div className='p-4'>
        <h1 className='text-center my-2 text-lg font-semibold'>Who to follow</h1>

        {filteredUsers?.length ? filteredUsers.map((user) => (
          <div key={user._id} className='flex items-center justify-between my-2'>
            <div className='flex gap-2 items-center bg-gray-900 p-3 rounded-2xl'>
              <Avatar src={user.profilePicture || `https://vishalmeshram.vercel.app/assets/profile-DauhVDqg.jpg`} size="40" round={true} alt='img' />
              <div className='flex items-center gap-2'>
                <h1 className='font-bold'>{user.name}</h1>
                <p className='font-semibold'>@{user.username}</p>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <button className='cursor-pointer rounded-2xl bg-sky-500 px-6 py-1'>Profile</button>
                </Link>
              </div>
            </div>
          </div>
        )) : (
          <p className='text-center text-gray-500 mt-3'>No users found</p>
        )}

      </div>
    </div>
  )
}

export default RightSidebar
