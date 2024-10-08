import axios from "axios";

const userAxiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/users",
});

userAxiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

userAxiosInstance.interceptors.response.use(
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

export default userAxiosInstance;
