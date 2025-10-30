import axios from "axios";

export const TMServerClient = axios.create({
  baseURL: import.meta.env.VITE_TASK_MANAGER_SERVER_URL,
});

TMServerClient.interceptors.request.use((config) => {
  /* implementation for future */
  return config;
});

TMServerClient.interceptors.response.use((config) => {
  /* implementation for future */
  return config;
});
