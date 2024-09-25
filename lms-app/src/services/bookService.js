import axiosInstance from "../interceptors/bookInterceptor";

export const getAllBooks = async () => await axiosInstance.get("/get");
