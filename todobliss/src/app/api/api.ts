import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-backend-1-0lng.onrender.com", // Use your backend URL here
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;