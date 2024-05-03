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
        if (response.status !== 200) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
};

export { registerUser, loginUser, checkUserSession, logout };
