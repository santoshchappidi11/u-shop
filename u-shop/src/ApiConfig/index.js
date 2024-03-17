import axios from "axios";

const api = axios.create({
  // baseURL: "https://meesho-clone-w3ww.onrender.com",
  baseURL: "http://localhost:8000",
});

export default api;
