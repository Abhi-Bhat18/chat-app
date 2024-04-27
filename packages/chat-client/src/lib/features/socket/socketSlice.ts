import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  isSocketConnected: false,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      (state.socket = action.payload.socket), (state.isSocketConnected = true);
    },
  },
});

export const { } = socketSlice.actions;

export default socketSlice.reducer;
