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

const AddNewCustomerAddressAPI = async (address) => {
  try {
    const response = await API.post("/customer/address/add", address);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const UpdateCustomerAddressAPI = async (id, payload) => {
  try {
    const response = await API.put(
      `/customer/address/id/update/${id}`,
      payload
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const DeleteCustomerAddressAPI = async (id) => {
  try {
    const response = await API.delete(`/customer/address/id/delete/${id}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  GetAllCustomersAPI,
  UpdateCustomerDataAPI,
  AddNewCustomerAddressAPI,
  DeleteCustomerAddressAPI,
  UpdateCustomerAddressAPI,
};
