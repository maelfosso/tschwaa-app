// import axios from 'axios';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { SlowBuffer } from "buffer";
import { signOut } from "next-auth/react";
import { catchAxiosError } from "../services/error";

const isServer = () => typeof window === 'undefined';

class CustomAxiosInstance {
  instance: AxiosInstance;

  constructor() {
    const baseConfig: AxiosRequestConfig = {
      baseURL: isServer() ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    this.instance = axios.create(baseConfig);

    // this.instance.interceptors.response.use(this.onRequestFulfilled, this.onRequestRejected)
  }

  onRequestFulfilled(response: AxiosResponse) {
    return response;
  }

  onRequestRejected(error: AxiosError) {
    console.log("Interceptors Errors");
    if (error?.response?.status == 401) {
      console.log('Authorization 401 errror');
      alert("Authorization 401")
      window.location.href = '/auth/sign-in'
      return
    }

    return error;
  }

  setToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async post<T>(url: string, inputs: URLSearchParams | string) {
    console.log('post ', url, this.instance.defaults.baseURL)
    try {
      const { data } = await this.instance.post<T>(url, inputs);
      return data as T;
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
    }
  }

  async get<T>(url: string) {
    try {
      console.log('Headers ', this.instance.defaults.headers);
      const { data } = await this.instance.get<T>(url);
      return data as T;
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
    }
  }

}

const customAxiosInstance = new CustomAxiosInstance();
export default customAxiosInstance;

