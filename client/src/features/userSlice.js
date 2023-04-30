import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name:"",
    email:"",
    isAdmin:"",
}

export const userSlice = createSlice({
    name:'user_info',
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.isAdmin = action.payload.isAdmin
        },
        unsetUserInfo:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.isAdmin = action.payload.isAdmin
        }
    }
})

export const {setUserInfo,unsetUserInfo}= userSlice.actions

export default userSlice.reducer