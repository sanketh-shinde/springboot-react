import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  users: [],
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    fetchError: (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { fetchRequest, fetchSuccess, fetchError } = userSlice.actions;
