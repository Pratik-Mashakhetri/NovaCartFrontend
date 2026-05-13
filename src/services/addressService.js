import axios from "axios";

const API =
  "http://localhost:8080/api/address";

export const addAddress = async (
  addressData
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.post(

    API,
    addressData,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const getUserAddresses =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(

      API,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
};