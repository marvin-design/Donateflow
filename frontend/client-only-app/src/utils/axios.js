// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://donateflow-1.onrender.com", // Flask backend
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
