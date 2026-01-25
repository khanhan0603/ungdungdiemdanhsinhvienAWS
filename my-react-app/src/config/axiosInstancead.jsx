import axios from "axios";
import { refreshToken } from "../services/authServicead";

const axiosInstance = axios.create({
  baseURL: "https://be.luongminhkhanhan.io.vn/api",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Thêm token vào request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// Refresh token interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshToken();
        const newToken = data.access_token;

        localStorage.setItem("token", newToken);

        axiosInstance.defaults.headers["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
