import axiosInstance from "../interceptors/bookInterceptor";

const getAllBooks = async () => await axiosInstance.get("/get");
export default getAllBooks;
