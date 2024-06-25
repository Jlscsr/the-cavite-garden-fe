import { API } from "../boot/axios";

const registerUser = async (credentials) => {
    try {
        const response = await API.post("/auth/register", credentials);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const LoginUserAPI = async (credentials) => {
    try {
        const response = await API.post("/auth/login", credentials);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const LogoutUserAPI = async () => {
    try {
        const response = await API.get("/auth/logout");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const CheckUserSessionAPI = async () => {
    try {
        const response = await API.get("/auth/check");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { registerUser, LoginUserAPI, CheckUserSessionAPI, LogoutUserAPI };
