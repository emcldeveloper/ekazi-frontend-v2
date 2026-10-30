import { OLD_API_URL } from "@/config";
import axios from "axios";

const oldApi = axios.create({
  baseURL: OLD_API_URL,
  withCredentials: false,
});

oldApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default oldApi;
