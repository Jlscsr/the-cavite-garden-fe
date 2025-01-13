import { API } from "../boot/axios";

const GetAllReportsAPI = async (payload) => {
  try {
    const response = await API.post("/reports", payload);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { GetAllReportsAPI };
