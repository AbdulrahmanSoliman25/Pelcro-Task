import axios from "axios";
const baseURL = "http://localhost:8000/api";
const instance = axios.create({
  baseURL,
});

instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["Accept"] = "application/json";

instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("authorization")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
