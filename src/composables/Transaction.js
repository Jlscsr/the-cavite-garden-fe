import { API } from "../boot/axios";

const GetAllTransactionAPI = async (status, orderPurpose) => {
  try {
    const response = await API.get(
      `/transactions/orderPurpose/status/${orderPurpose}/${status}`
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const GetAllCustomerTransactionsByID = async (id) => {
  try {
    const response = await API.get(`/transactions/customer/id/${id}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const AddNewTransactionAPI = async (data) => {
  try {
    const response = await API.post("/transaction/add", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const UpdateTransactionStatus = async (id, payload) => {
  try {
    const response = await API.put(`/transaction/status/update/${id}`, payload);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const UpdateTransactionOrderPurpose = async (id, payload) => {
  try {
    const response = await API.put(
      `/transaction/orderPurpose/update/${id}`,
      payload
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  GetAllTransactionAPI,
  AddNewTransactionAPI,
  UpdateTransactionStatus,
  GetAllCustomerTransactionsByID,
  UpdateTransactionOrderPurpose,
};
