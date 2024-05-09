import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setUserLogin: (state, action) => {
      (state.user = action.payload), (state.loggedIn = true);
    },
  },
});

export const { setUserLogin } = authSlice.actions;

export default authSlice.reducer;
