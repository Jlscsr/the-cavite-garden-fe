import { API } from "../boot/axios";

const getAllEmployees = async () => {
    try {
        const response = await API.get("/employees");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const addNewEmployeeRequest = async (payload) => {
    try {
        const response = await API.post("/employees/add", payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const updateEmployeeRequest = async (id, payload) => {
    try {
        const response = await API.put(`/employees/edit/${id}`, payload);
        console.log(response);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { getAllEmployees, addNewEmployeeRequest, updateEmployeeRequest };
