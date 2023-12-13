import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/Auth/authSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore ({
    reducer : {
        authReducer
    }
})
export type AppDispatch = typeof store.dispatch


export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>


