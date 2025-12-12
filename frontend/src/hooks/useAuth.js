import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import { getUser, setAuthChecked } from '../redux/userSlice';

const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthChecked } = useSelector(store => store.user);
    const [isLoading, setIsLoading] = useState(!isAuthChecked);

    useEffect(() => {
        const checkAuth = async () => {
            // If auth already checked, skip
            if (isAuthChecked) {
                setIsLoading(false);
                return;
            }

            try {
                // Check if user exists in localStorage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    // Verify token is still valid by calling backend
                    const res = await axios.get(`${USER_API_ENDPOINT}/me`, {
                        withCredentials: true
                    });
                    
                    if (res.data.success && res.data.user) {
                        dispatch(getUser(res.data.user));
                    } else {
                        // Token invalid, clear storage
                        localStorage.removeItem('user');
                        dispatch(getUser(null));
                    }
                } else {
                    // No stored user, ensure user is null
                    dispatch(getUser(null));
                }
            } catch (error) {
                // Token invalid or expired, clear storage
                console.log('Auth check failed:', error);
                localStorage.removeItem('user');
                dispatch(getUser(null));
            } finally {
                dispatch(setAuthChecked(true));
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [dispatch, isAuthChecked]);

    return { user, isLoading };
};

export default useAuth;

