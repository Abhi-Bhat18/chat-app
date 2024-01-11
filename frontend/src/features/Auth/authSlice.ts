import { createSlice } from "@reduxjs/toolkit";


interface User {
    _id : string,
    userName : string,
    fullName : string,
    imgUrl : string
}
interface AuthI {
    user: User | null,
}

const initialState: AuthI = {
    user: null ,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser : (state,action) => {
            state.user = action.payload
        },
        logoutUser : (state) => {
            state.user = null
        }
    },
})

export const { setUser, logoutUser } = authSlice.actions

export default authSlice.reducer