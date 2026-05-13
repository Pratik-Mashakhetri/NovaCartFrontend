import axiosInstance from "../api/axiosConfig";

export const addToCart = async (
  productId
) => {

  const response = await axiosInstance.post(
    `/api/cart/add/${productId}`
  );

  return response.data;
};

export const getCartItems = async () => {

  const response = await axiosInstance.get(
    "/api/cart"
  );

  return response.data;
};

export const updateCartQuantity = async (
  cartItemId,
  quantity
) => {

  const response = await axiosInstance.put(
    `/api/cart/${cartItemId}?quantity=${quantity}`
  );

  return response.data;
};

export const removeCartItem = async (
  cartItemId
) => {

  const response = await axiosInstance.delete(
    `/api/cart/${cartItemId}`
  );

  return response.data;
};