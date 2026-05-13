import axiosInstance from "../api/axiosConfig";

export const getAllProducts = async () => {

  const response = await axiosInstance.get(
    "/api/products"
  );

  return response.data;
};