import axios from "axios";

const INITIAL_TOKEN = "accessToken";
const tokenHandler = () => localStorage.getItem(INITIAL_TOKEN);
const baseURL = import.meta.env.VITE_HTTP_API_URL;
// axios 생성
const HttpClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

HttpClient.interceptors.request.use(
  async (config) => {
    if (config.url === "gallery/img") {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    const token = tokenHandler();

    if (token !== null || token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    console.error("에러발생", error);
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default HttpClient;
