import axios from "axios";

const url = "http://localhost:8081/api/auth";

export const registerUser = (user) => axios.post(`${url}/register`, user);
export const loginUser = (user) => axios.post(`${url}/login`, user);
