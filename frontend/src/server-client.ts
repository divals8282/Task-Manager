import axios from "axios";

const CREDENTIALS_REQUIRED_ENDPOINTS = [
  "/auth/logout",
  "/item",
  "/actions",
  "/item-list",
];

const client = axios.create({
  baseURL: import.meta.env.VITE_TASK_MANAGER_SERVER_URL,
});

client.interceptors.request.use(function (config) {
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
});

client.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(111);
    return response;
  },
  function onRejected(error) {
    console.log(2222);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const TMServerClient = client;
