import { PayloadAction, createSlice} from '@reduxjs/toolkit'

const initialState : loginInterface = {
    user : {},
    isLoggedIn : false
}
interface loginInterface {
    user : any,
    isLoggedIn : boolean
}
export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : { 
        login : (state, action : PayloadAction<loginInterface>) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        logout : (state) => {
            state.isLoggedIn = false,
            state.user = null
        },
    }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer