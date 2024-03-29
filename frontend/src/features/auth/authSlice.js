//redux

import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload
      state.token =accessToken
    },
    logOut: (state) => {
      state.token = null;

    },
  },
});
export const selectToken = (state) => state.auth.token;
export const { setToken, logOut } = authSlice.actions;
export default authSlice.reducer;
