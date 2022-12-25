import axios from "axios";
const baseURL = "http://localhost:8000/api";
const instance = axios.create({
  baseURL,
});
instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err.response.data);
  }
);
export default instance;
