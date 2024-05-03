import { API } from "../boot/axios";

const getUserInfo = async () => {
    try {
        const response = await API.get("/customer/info");

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
        if (response.status !== 201) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export { getUserInfo, addNewUserAddress, getEmployeeInfo };
