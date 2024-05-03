import { API } from "../boot/axios";

const getAllEmployeesRequest = async () => {
    try {
        const response = await API.get("/customers");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { getAllEmployeesRequest };
