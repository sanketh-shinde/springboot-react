import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  books: [],
  error: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    fetchBooksRequest: (state) => {
      state.isLoading = true;
    },
    fetchBooksSuccess: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    fetchBooksError: (state, action) => {
      state.isLoading = false;
      state.books = [];
      state.error = action.payload;
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export default bookSlice.reducer;
export const {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksError,
  deleteBook,
} = bookSlice.actions;
