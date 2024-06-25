import { API } from "../boot/axios";

const GetUserInfoAPI = async () => {
    try {
        const response = await API.get("/user");

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

const addNewUserAddress = async (address) => {
    try {
        const response = await API.post("/customer/address/add", address);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { GetUserInfoAPI, addNewUserAddress, getEmployeeInfo };
