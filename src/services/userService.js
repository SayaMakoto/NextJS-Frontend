import axios from "axios";

const API = "http://localhost:5000/api/users";

export const getUsers = (params) =>
  axios.get(API, { params }).then((res) => res.data);

export const getUserById = (id) =>
  axios.get(`${API}/${id}`).then((res) => res.data);

export const updateUser = (id, data) => axios.put(`${API}/${id}`, data);

export const deleteUser = (id) => axios.delete(`${API}/${id}`);
