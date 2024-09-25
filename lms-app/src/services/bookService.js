import axiosInstance from "../interceptors/bookInterceptor";

export const getAllBooks = () => axiosInstance.get("/get");
