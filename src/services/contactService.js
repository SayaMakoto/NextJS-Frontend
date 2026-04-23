import axiosInstance from "@/lib/axiosInstance";

export const getContacts = async (params = {}) => {
  const res = await axiosInstance.get("/contacts", { params });
  return res.data;
};

export const getContactById = async (id) => {
  const res = await axiosInstance.get(`/contacts/${id}`);
  return res.data;
};

export const updateContact = async (id, data) => {
  const res = await axiosInstance.put(`/contacts/${id}`, data);
  return res.data;
};

export const delContact = async (id) => {
  const res = await axiosInstance.delete(`/contacts/${id}`);
  return res.data;
};
