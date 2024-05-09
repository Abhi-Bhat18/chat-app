import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import apiSlice from "./api";
import socketSlice from "./features/socket/socketSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      socket: socketSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type AppStore = ReturnType<typeof makeStore>; // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
