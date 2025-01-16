import { API } from "../boot/axios";

const GetAllRefundTransactionsAPI = async (status) => {
  try {
    const response = await API.get(`/refund/transactions/status/${status}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const AddNewRefundTransactionAPI = async (payload) => {
  try {
    const response = await API.post("/refund/transaction/add", payload);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const UpdateRefundTransactionStatusAPI = async (transactionID, payload) => {
  try {
    const response = await API.put(
      `/refund/transaction/status/update/${transactionID}`,
      payload
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  GetAllRefundTransactionsAPI,
  AddNewRefundTransactionAPI,
  UpdateRefundTransactionStatusAPI,
};
