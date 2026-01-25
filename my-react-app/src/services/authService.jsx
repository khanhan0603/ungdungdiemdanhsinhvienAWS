import axios from "axios";
import axiosInstance from "../config/axiosInstance";

const API_BASE = "https://be.luongminhkhanhan.io.vn/api";

const login = async (body) => {
  return await axiosInstance.post("/auth/login", body);
};

const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await axiosInstance.post("/auth/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const getInfo = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const res = await axiosInstance.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data || res.user || res;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");


  const res = await axios.post(
    `${API_BASE}/auth/refresh`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};


export { login, getInfo, logout, refreshToken };
