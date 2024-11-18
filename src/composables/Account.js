import { API } from "../boot/axios";

const GetUserInfoAPI = async () => {
  try {
    const response = await API.get("/user/info");

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getEmployeeInfo = async () => {
  try {
    const response = await API.get("/employee/info");

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { GetUserInfoAPI, getEmployeeInfo };
