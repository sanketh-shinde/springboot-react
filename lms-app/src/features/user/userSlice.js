import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.isAuthenticated = false;
    },
    fetchUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserError: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { fetchUserRequest, fetchUserSuccess, fetchUserError } =
  userSlice.actions;
