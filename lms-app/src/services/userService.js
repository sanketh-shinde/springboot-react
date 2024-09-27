import userAxiosInstance from "../interceptors/userInterceptor";

export const updateUser = async (requestedUser) =>
  await userAxiosInstance.put("/update", requestedUser);
