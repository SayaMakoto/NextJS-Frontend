import axiosInstance from "../lib/axiosInstance";

export const register = async (data) => {
  let res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  let res = await axiosInstance.post("/auth/login", data);

  const { user, token } = res.data;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);

  return { user, token };
};

export const me = async () => {
  let res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const profile = async (id) => {
  let res = await axiosInstance.get(`/auth/profile/${id}`);
  return res.data;
};

export const updateProfile = async (data) => {
  let res = await axiosInstance.put("/auth/profile", data);
  return res.data;
};

export const changePassword = async (data) => {
  let res = await axiosInstance.put("/auth/change-password", data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
