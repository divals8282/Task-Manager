import axios from "axios";

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

client.interceptors.request.use(
  (config) => {
    let isCredentialRequired = false;
    for (const credentialsRequiredEndpoint of CREDENTIALS_REQUIRED_ENDPOINTS) {
      if (config.url?.indexOf(credentialsRequiredEndpoint) !== -1) {
        isCredentialRequired = true;
        break;
      }
    }

    const credentialsAtStorage = localStorage.getItem("credentials");
    if (isCredentialRequired) {
      if (credentialsAtStorage) {
        const credentials = JSON.parse(credentialsAtStorage) as {
          accessToken: string;
          refreshToken: string;
        };

        config.headers["Authorization"] = `Bearer ${credentials.accessToken}`;
      } else {
        throw new Error("No credentials at storage, need to loggin");
      }
    }

    return config;
  },
  (error) => {
    return error;
  }
);

client.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);

export const TMServerClient = client;
