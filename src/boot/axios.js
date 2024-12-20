import axios from "axios";

const environment = import.meta.env.VITE_ENVIRONMENT;
const BASE_URL =
  environment === "development"
    ? "https://the-cavite-garden-be.local/?"
    : "https://agile-forest-86410-744466084125.herokuapp.com/?";

const axiosConfig = {
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const API = axios.create(axiosConfig);

export { API };
