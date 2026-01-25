/*// src/api/axiosClient.js
import axios from "axios";
import AppURL from "./AppURL";

// tạo instance axios
const axiosClient = axios.create({
  baseURL: AppURL.BaseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// helper lấy token từ localStorage
function getLocalToken() {
  return localStorage.getItem("token");
}

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

// request interceptor: gán token + cancelToken
axiosClient.interceptors.request.use(
  (config) => {
    const token = getLocalToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // tạo cancel token để có thể hủy request nếu cần
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    config.__cancelSource = source;

    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor: trả về response.data và tự refresh token khi 401
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // nếu bị cancel thì trả về reject như bình thường
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // không có refresh token => clear và reject
        localStorage.removeItem("token");
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // đang refresh, queue request lại
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // dùng plain axios để gọi refresh (tránh vòng lặp interceptors)
        const res = await axios.post(`${AppURL.API_BASE}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        // chuẩn hóa key token trả về (tùy API)
        const newToken =
          (res.data && (res.data.access_token || res.data.token || res.data.accessToken)) ||
          (res.access_token || res.token);

        if (!newToken) throw new Error("Refresh token failed: no token returned");

        // lưu token mới
        localStorage.setItem("token", newToken);

        axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // refresh thất bại -> xóa token, force logout ở client nếu cần
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const cancelPendingRequest = (config) => {
  if (config && config.__cancelSource) {
    config.__cancelSource.cancel("Pending Request Cancelled");
  }
};

export default axiosClient;
*/
import axios from "axios";

const api = axios.create({
    baseURL: "http://luongminhkhanhan.io/api",
});

// Gắn token vào header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Tự refresh token khi bị 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh_token");

            const res = await axios.post("http://luongminhkhanhan.io/api/refresh", {}, {
                headers: { Authorization: `Bearer ${refreshToken}` }
            });

            localStorage.setItem("access_token", res.data.access_token);

            api.defaults.headers.common["Authorization"] =
                "Bearer " + res.data.access_token;

            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default api;
