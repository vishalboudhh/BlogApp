import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"user",
    initialState:{
        user: null, // Don't load from localStorage initially - wait for auth verification
        otherUsers:null,
        profile:null,
        isAuthChecked: false
    },
    reducers:{
        //actions
        getUser:(state,action)=>{
            state.user = action.payload;
            // Persist to localStorage
            if (action.payload) {
                localStorage.setItem('user', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('user');
            }
        },
        getOtherUser:(state,action)=>{
            state.otherUsers = action.payload;
        },
        getMyProfile:(state,action)=>{
            state.profile = action.payload;
        },
        updateUserAndProfile:(state,action)=>{
            const data = action.payload;
            if (data.user) {
                state.user = data.user;
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            if (data.profile) {
                state.profile = data.profile;
            }
        },
        logoutUser:(state)=>{
            state.user = null;
            state.profile = null;
            localStorage.removeItem('user');
        },
        setAuthChecked:(state,action)=>{
            state.isAuthChecked = action.payload;
        }
    }
});

export const {getUser,getOtherUser,getMyProfile,updateUserAndProfile,logoutUser,setAuthChecked} = userSlice.actions;
export default userSlice.reducer;