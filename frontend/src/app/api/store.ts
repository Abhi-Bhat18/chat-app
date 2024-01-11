import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { apiSlice } from './apiSlice'
import { authApiSlice } from '../../features/Auth/authApiSlice'


import authReducer from '../../features/Auth/authSlice'
import messageReducer from '../../features/Message/messageSlice';

export const store = configureStore({
    reducer: {
        'auth': authReducer,
        'message': messageReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, authApiSlice.middleware)
})


export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>


