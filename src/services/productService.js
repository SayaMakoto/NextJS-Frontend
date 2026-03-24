import axiosInstance from "@/lib/axiosInstance";

export const getProducts = async (params = {}) => {
  const res = await axiosInstance.get("/products", {
    params: params,
  });
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axiosInstance.put(`/products/${id}`, data);
  return res.data;
};
export const delProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
export const getNewProducts = async (limit = 10) => {
  const res = await axiosInstance.get("/products/new", {
    params: { limit },
  });
  return res.data;
};
export const getBestSellerProducts = async (limit = 5) => {
  const res = await axiosInstance.get("/products/bestseller", {
    params: { limit },
  });
  return res.data;
};
export const getRelatedProducts = async (id, limit = 5) => {
  const res = await axiosInstance.get(`/products/related/${id}`, {
    params: { limit },
  });
  return res.data;
};
