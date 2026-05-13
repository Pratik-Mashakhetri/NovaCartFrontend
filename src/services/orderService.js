import axios from "../api/axiosConfig";

export const placeOrder = async (addressId) => {

  const response = await axios.post(
    `/api/orders/place?addressId=${addressId}`
  );

  return response.data;
};

export const getMyOrders = async () => {

  const response = await axios.get(
    "/api/orders/my-orders"
  );

  return response.data;
};

export const cancelOrder = async (orderId) => {

  const response = await axios.put(
    `/api/orders/cancel/${orderId}`
  );

  return response.data;
};