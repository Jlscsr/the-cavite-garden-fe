import { API } from "../boot/axios";

const registerUser = async (credentials) => {
    try {
        const response = await API.post("/auth/register", credentials);

        if (response.data.code !== 201) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
};

const loginUser = async (credentials) => {
    try {
        const response = await API.post("/auth/login", credentials);

        if (response.data.code !== 201) {
            return false;
        }
        return response.data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
};

const logout = async () => {
    try {
        const response = await API.get("/auth/logout");

        if (response.data.code !== 200) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(error.message);
        return [];
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
