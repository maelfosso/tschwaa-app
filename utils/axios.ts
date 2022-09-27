import axios, { AxiosRequestConfig } from "axios";
import { catchAxiosError } from "../services/error";

const baseConfig: AxiosRequestConfig = {
  baseURL: typeof window === 'undefined' ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'applicatin/json',
    'Accept': 'application/json'
  }
}

// Set config defaults when creating the instance
const instance = axios.create(baseConfig);

export const post = async <T>(url: string, inputs: URLSearchParams | string) => {
  try {
    const { data } = await instance.post<any>(url, inputs);
    return data as T;
  } catch (error) {
    throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
  }
}

export const get = async<T> (url: string, options: { token: string }) => {
  const { token } =  options;
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  try {
    const { data } = await instance.get<any>(url);
    return data as T;
  } catch (error) {
    throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
  }
}
// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;
