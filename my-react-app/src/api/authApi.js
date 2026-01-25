
/*// src/api/authApi.js
import axios from "axios";
import axiosClient from "./axiosClient";
import AppURL from "@/config/AppURL";

const authApi = {
  login(body) {
    // returns { access_token, refresh_token, user } ideally
    return axiosClient.post("/auth/login", body);
  },

  logout() {
    return axiosClient.post("/auth/logout");
  },

  refresh(refreshToken) {
    // plain axios so it doesn't go through axiosClient interceptors
    return axios.post(`${AppURL.API_BASE}/auth/refresh`, {
      refresh_token: refreshToken,
    });
  },

  me() {
    return axiosClient.get("/auth/me");
  },
};

export default authApi;
*/
// authApi.js
import axios from "axios";

const authApi = {
  login: (data) => axios.post("https://be.luongminhkhanhan.io/api/auth/login", data),
  me: () => axios.get("https://be.luongminhkhanhan.io/api/auth/me")
};

export default authApi;
