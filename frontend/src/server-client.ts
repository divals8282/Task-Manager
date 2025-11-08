import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

const CREDENTIALS_REQUIRED_ENDPOINTS = [
  "/auth/logout",
  "/auth/user-info",
  "/item",
  "/actions",
  "/item-list",
];

const client = axios.create({
  baseURL: import.meta.env.VITE_TASK_MANAGER_SERVER_URL,
});

// Helper to get credentials
const getCredentials = () => {
  const credentialsAtStorage = localStorage.getItem("credentials");
  return credentialsAtStorage
    ? (JSON.parse(credentialsAtStorage) as {
        accessToken: string;
        refreshToken: string;
      })
    : null;
};

// Helper to save credentials
const saveCredentials = (credentials: {
  accessToken: string;
  refreshToken: string;
}) => {
  const existing = localStorage.getItem("credentials");
  const parsed = existing ? JSON.parse(existing) : {};
  localStorage.setItem(
    "credentials",
    JSON.stringify({
      ...parsed,
      ...credentials,
    })
  );
};

// ----- REQUEST INTERCEPTOR -----
client.interceptors.request.use(
  (config) => {
    const isCredentialRequired = CREDENTIALS_REQUIRED_ENDPOINTS.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (isCredentialRequired) {
      const credentials = getCredentials();
      if (!credentials) {
        throw new Error("No credentials in storage, need to log in");
      }
      config.headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Flag to prevent multiple parallel refreshes
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ----- RESPONSE INTERCEPTOR -----
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Only handle 401 errors and prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      const credentials = getCredentials();
      if (!credentials?.refreshToken) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Wait until refresh is done, then retry
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (value) => {
              if (originalRequest.headers)
                originalRequest.headers["Authorization"] = `Bearer ${value as string}`;
              resolve(client(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TASK_MANAGER_SERVER_URL}/auth/refresh-credentials`,
          {
            headers: {
              "x-refresh-token": credentials.refreshToken,
            },
          }
        );

        const newAccessToken = response.data.auth.accessToken;
        const newRefreshToken = response.data.auth.refreshToken;

        saveCredentials({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        client.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        // Retry the original request with new token
        if (originalRequest.headers)
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("credentials"); // force logout if refresh fails
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const TMServerClient = client;