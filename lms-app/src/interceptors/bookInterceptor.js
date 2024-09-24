import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/books",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status == 302) {
      console.log(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized: Please log in again.");
      } else if (error.response.status === 404) {
        console.error("Not Found: The requested resource was not found.");
      } else {
        console.error("An error occurred: ", error.response.data);
      }
    } else {
      console.error("Network Error: ", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
