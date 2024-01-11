// import axios from 'axios';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { SlowBuffer } from "buffer";
import { signOut } from "next-auth/react";
import { catchAxiosError } from "../services/error";
import { fromJson, toJson } from "./utils";

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
    if (error?.response?.status == 401) {
      window.location.href = '/auth/sign-in'
      return
    }

    return error;
  }

  setToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async post<T>(url: string, inputs: URLSearchParams | string, options: { token?: string } = {}) {
    const { token } = options;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      const { data } = await this.instance.post<T>(url, inputs, config);
      return data as T;
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
    }
  }

  async patch<T>(url: string, inputs: URLSearchParams | string, options: { token?: string } = {}) {
    const { token } = options;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      const { data } = await this.instance.patch<T>(url, inputs, config);
      return data as T;
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
    }
  }

  async delete<T>(url: string, options: { token?: string } = {}) {
    const { token } = options;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      const { data } = await this.instance.delete<T>(url, config);
      return data as T;
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
    }
  }

  async get<T>(url: string, options: { token?: string } = {}) {
    const { token } = options;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log('get ', config);
    try {
      let { data } = await this.instance.get<T>(url, config);
      data = fromJson(data) as T;
      return data;
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
    }
  }

}

const customAxiosInstance = new CustomAxiosInstance();
export default customAxiosInstance;

