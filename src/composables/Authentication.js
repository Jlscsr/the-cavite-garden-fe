import { API } from "../boot/axios";

const registerUser = async (credentials) => {
    try {
        const response = await API.post("/auth/register", credentials);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const loginUser = async (credentials) => {
    try {
        const response = await API.post("/auth/login", credentials);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const logout = async () => {
    try {
        const response = await API.get("/auth/logout");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const checkUserSession = async () => {
    try {
        const response = await API.get("/auth/check");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const RequestToCheckUserRole = async () => {
    try {
        const response = await API.get("/auth/check-role");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export {
    registerUser,
    loginUser,
    checkUserSession,
    logout,
    RequestToCheckUserRole,
};
