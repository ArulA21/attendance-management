import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Always attach latest token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.token = token;
    } else {
      delete config.headers.token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
