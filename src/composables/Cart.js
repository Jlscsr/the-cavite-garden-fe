import { API } from "../boot/axios";

const AddToCartAPI = async (data) => {
  try {
    const response = await API.post("/customer/cart/add", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const GetAllProductsInUserCartAPI = async () => {
  try {
    const response = await API.get("/customer/cart");

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getProductsInCartByCustomerId = async (customerId) => {
  try {
    const response = await API.get(`/cart/customer/${customerId}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const DeleteProductFromCartAPI = async (id) => {
  try {
    const response = await API.delete(`/cart/delete/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export {
  AddToCartAPI,
  getProductsInCartByCustomerId,
  GetAllProductsInUserCartAPI,
  DeleteProductFromCartAPI,
};
