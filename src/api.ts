import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/products";
const DEFAULT_TIMEOUT = 20000;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
});

api.interceptors.response.use(
  ({ data }) => data,
  (error) => {
    return Promise.reject(error);
  }
);
