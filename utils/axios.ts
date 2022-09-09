import axios, { AxiosRequestConfig } from "axios";
import { catchAxiosError } from "../services/error";

const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'applicatin/json',
    'Accept': 'application/json'
  }
}

// Set config defaults when creating the instance
const instance = axios.create(baseConfig);

// export async function post<T>(url: string, inputs: URLSearchParams | string) {
export const post = async <T>(url: string, inputs: URLSearchParams | string) => {
  try {
    const { data } = await instance.post<any>(url, inputs);
    console.log('post T ', data);
    return data as T;
  } catch (error) {
    console.log("ERROR \n", error);
    return axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred";
  }
}

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;
