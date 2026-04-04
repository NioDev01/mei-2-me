import axios from "axios";
import { getAccessToken, setAccessToken } from "./auth";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// 🔐 Interceptor de requisição (envia token)
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔄 Interceptor de resposta (refresh automático)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");

        setAccessToken(res.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Sessão expirada");
        // aqui depois podemos redirecionar para login
      }
    }

    return Promise.reject(error);
  },
);
