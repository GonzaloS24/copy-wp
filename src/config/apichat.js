import axios from "axios";
import { APICHAT_URL } from "../utils/backendUrl";
import { getWorkspaceToken } from "../utils/workspace";

// Configuración base de axios
const apichat = axios.create({
  baseURL: APICHAT_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token automáticamente
apichat.interceptors.request.use(
  (config) => {
    const token = getWorkspaceToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
apichat.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apichat;
