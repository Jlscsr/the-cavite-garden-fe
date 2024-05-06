import axios from "axios";

const axiosConfig = {
    baseURL: "http://localhost/the-cavite-garden-be/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
};

const API = axios.create(axiosConfig);

export { API };
