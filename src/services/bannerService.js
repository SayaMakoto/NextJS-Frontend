import axiosInstance from "@/lib/axiosInstance";

export const getBanners = async (params = {}) => {
  const res = await axiosInstance.get("/banners", { params });
  return res.data;
};

export const delBanner = async (id) => {
  const res = await axiosInstance.delete(`/banners/${id}`);
  return res.data;
};
