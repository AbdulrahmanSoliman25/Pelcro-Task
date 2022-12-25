import axios from "axios";
import Router from "../router/index";
const baseURL = "http://localhost:8000/api";
const instance = axios.create({
  baseURL,
});

instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["Accept"] = "application/json";
instance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("authorization");

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("authorization");
      Router.go({ name: "login" });
    }
    console.log(err.response.data);
  }
);
export default instance;
