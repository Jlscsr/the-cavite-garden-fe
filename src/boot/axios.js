import axios from "axios";

const environment = import.meta.env.VITE_ENVIRONMENT;
const BASE_URL =
  environment === "development"
    ? "http://localhost/the-cavite-garden-be"
    : "https://intense-island-06346-212c89960968.herokuapp.com";

const axiosConfig = {
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const API = axios.create(axiosConfig);

export { API };
