import axios from "axios";

const url = "http://localhost:8081/api/auth";

export const registerUser = (user) => axios.post(`${url}/register`, user);
export const loginUser = async (user) => await axios.post(`${url}/login`, user);
