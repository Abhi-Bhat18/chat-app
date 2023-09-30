import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./config";

export enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const axiosInstance = (
  method: string,
  body: object | null,
  authenticated: boolean
): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    method,
  };
  if (authenticated) config.withCredentials = true;

  if (body && method !== "GET") {
    config.data = body;
  }

  return axios.create(config);
};


export default axiosInstance;
