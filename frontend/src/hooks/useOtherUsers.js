import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/constant"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  getOtherUser } from "../redux/userSlice";
const useOtherUser = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/allusers/${id}`, {
                    withCredentials: true
                });
                dispatch(getOtherUser(res.data.otherUsers));
            } catch (error) {
                console.log(error);
            }
        }
        if(id) fetchOtherUsers();
    }, [id, dispatch])

};
export default useOtherUser;