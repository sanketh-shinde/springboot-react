import bookAxiosInstance from "../interceptors/bookInterceptor";

export const getAllBooks = async () => await bookAxiosInstance.get("/get");

export const createBook = async (book) =>
  await bookAxiosInstance.post("/create", book);
