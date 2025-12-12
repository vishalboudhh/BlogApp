import React, { useState, useEffect } from 'react'
import img from "../assets/logo.jpg"
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from '../redux/userSlice';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading } = useAuth(); // Check auth on mount

    // Redirect if already logged in (after auth check completes)
    useEffect(() => {
        if (!isLoading && user) {
            navigate("/");
        }
    }, [user, isLoading, navigate]);

    const loginSignupHandler = () => {
        setIsLogin(!isLogin)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/login`, { email, password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                dispatch(getUser(res?.data?.user));
                if (res.data.success) {
                    toast.success(res.data.message)
                    setName("")
                    setUsername("")
                    setEmail("")
                    setPassword("")
                    navigate("/")
                }

            } catch (error) {
                toast.error(error.response.data.message)
                console.log(`Error in login component`, error);
            }
        } else {
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/signup`, { name, username, email, password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.message)
                    setName("")
                    setUsername("")
                    setEmail("")
                    setPassword("")
                    setIsLogin(true);
                }


            } catch (error) {
                toast.error(error.response.data.message)
                console.log(`Error in signin component`, error);
            }
        }
    }

    return (
        <div className='w-screen min-h-screen flex items-center justify-center p-4'>
            <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-evenly w-full max-w-6xl'>
                <div className='hidden lg:block lg:flex-1'>
                    <img src={img} className='w-full max-w-[300px] mx-auto' alt="" />
                    <h1 className="text-3xl lg:text-4xl ml-12 mt-4 font-bold hover:cursor-pointer">
                        <span className="bg-linear-to-r from-sky-600 to-purple-500 bg-clip-text text-transparent">Social</span>
                        <span className="bg-linear-to-r from-purple-800 to-red-500 bg-clip-text text-transparent">Blogs</span>
                    </h1>
                </div>
                <div className="w-full max-w-[380px] shadow-xl rounded-2xl p-6 md:p-8">
                    <h2 className="text-center text-2xl md:text-3xl font-bold pb-4 md:pb-6 text-white bg-clip-text">
                        {isLogin ? "Login" : "SignUp"}
                    </h2>

                    <form className="flex flex-col gap-3 md:gap-4" onSubmit={submitHandler}>
                        {
                            !isLogin && (
                                <>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 w-full py-2 px-4 rounded-full transition-all text-sm md:text-base"
                                    />

                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 w-full py-2 px-4 rounded-full transition-all text-sm md:text-base"
                                    />
                                </>
                            )
                        }


                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 w-full py-2 px-4 rounded-full transition-all text-sm md:text-base"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 w-full py-2 px-4 rounded-full transition-all text-sm md:text-base"
                        />

                        <button
                            className="cursor-pointer mt-2 md:mt-4 py-2 bg-linear-to-r from-sky-600 to-red-500 text-white rounded-full font-semibold hover:opacity-90 transition-all text-sm md:text-base"
                        >
                            {isLogin ? "Login" : "SignUp"}
                        </button>

                        <p className="text-center text-xs md:text-sm mt-2 text-gray-600">
                            {isLogin ? "Don't have an account?" : "Already Have an Account "}
                            <span className="text-purple-600 font-semibold hover:underline cursor-pointer" onClick={loginSignupHandler}>
                                {isLogin ? " SignUp" : " Login"}
                            </span>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
