import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://your-url.com/api",
});

instance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("auth-token");

    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
