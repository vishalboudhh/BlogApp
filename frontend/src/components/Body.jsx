import React from 'react'
import {createBrowserRouter,RouterProvider, Navigate} from "react-router-dom"
import Home from './Home'
import Login from './Login'
import Feed from './Feed'
import Profile from './Profile'
import Bookmark from './Bookmark'
import ProtectedRoute from './ProtectedRoute'
const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<ProtectedRoute><Home/></ProtectedRoute>,
            children:[
                {
                    path:"/",
                    element:<Feed/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                },
                {
                    path:"/bookmarks",
                    element:<Bookmark/>
                }
            ]
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"*",
            element:<Navigate to="/" replace />
        }
    ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
