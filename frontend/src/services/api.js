import axios from "axios";

// instance axios pointant vers le backend
const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// ajouter le token JWT dans chaque requête si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
