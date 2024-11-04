import { API } from "../boot/axios";

/**
 * Async function to register a user using provided credentials.
 *
 * @param {Object} credentials - The user credentials to register.
 * @return {Promise} A promise that resolves with the registration response data.
 */
const RegisterUserAPI = async (credentials) => {
    try {
        const response = await API.post("/auth/register", credentials);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/**
 * Async function to log in a user using provided credentials.
 *
 * @param {Object} credentials - The user credentials for login.
 * @return {Promise} A promise that resolves with the login response data.
 */
const LoginUserAPI = async (credentials) => {
    try {
        const response = await API.post("/auth/login", credentials);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/**
 * Asynch function to log out a user by sending a request to the "/auth/logout" endpoint.
 *
 * @return {Promise} A promise that resolves with the data of the logout response.
 */
const LogoutUserAPI = async () => {
    try {
        const response = await API.get("/auth/logout");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/**
 * Asynchronously checks the user session by sending a GET request to the "/auth/check" endpoint.
 *
 * @return {Promise<Object>} A Promise that resolves with the response data if the request is successful,
 * or rejects with the error response data if the request fails.
 */
const CheckUserSessionAPI = async () => {
    try {
        const response = await API.get("/auth/check");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { RegisterUserAPI, LoginUserAPI, CheckUserSessionAPI, LogoutUserAPI };
