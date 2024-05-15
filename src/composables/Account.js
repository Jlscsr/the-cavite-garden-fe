import { API } from "../boot/axios";

const getUserInfo = async () => {
    try {
        const response = await API.get("/customer");

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

export { getUserInfo, addNewUserAddress, getEmployeeInfo };
