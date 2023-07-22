import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: null,
    restaurant: null,
    token: null, 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setLogin: (state,action)=>{
            state.restaurant = action.payload.restaurant
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setUser:(state,action)=>{
            state.user = action.payload.user
        },
        setRestaurant:(state,action)=>{
            state.restaurant = action.payload.restaurant
        },
        setLogout: (state)=>{
            state.user = null
            state.restaurant = null
            state.token = null
        }
    }
})

export const {setLogin,setLogout,setUser,setRestaurant} = authSlice.actions
export default authSlice.reducer