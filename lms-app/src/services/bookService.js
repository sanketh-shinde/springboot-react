import bookAxiosInstance from "../interceptors/bookInterceptor";

export const getAllBooks = async () => await bookAxiosInstance.get("/get");

export const createBook = async (book) =>
  await bookAxiosInstance.post("/create", book);

export const fetchById = async (id) =>
  await bookAxiosInstance.get(`/getById/${id}`);

export const updateBookById = async (book) =>
  await bookAxiosInstance.put("/update", book);

export const deleteBookById = async (id) =>
  await bookAxiosInstance.delete(`/delete/${id}`);
