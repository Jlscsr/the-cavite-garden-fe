import { API } from "../boot/axios";

const GetAllCustomersAPI = async () => {
  try {
    const response = await API.get("/customers");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const UpdateCustomerDataAPI = async (payload) => {
  try {
    const response = await API.post(`/customer/update`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { GetAllCustomersAPI, UpdateCustomerDataAPI };
