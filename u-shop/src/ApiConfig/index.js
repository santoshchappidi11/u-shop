import axios from "axios";

const api = axios.create({
  baseURL: "https://u-shop-1v6h.onrender.com",
  // baseURL: "http://localhost:8000",
});

export default api;
