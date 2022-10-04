// import axios from 'axios';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { SlowBuffer } from "buffer";
import { signOut } from "next-auth/react";
import { catchAxiosError } from "../services/error";

const baseConfig: AxiosRequestConfig = {
  baseURL: typeof window === 'undefined' ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'applicatin/json',
    'Accept': 'application/json'
  }
}

class CustomAxiosInstance {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(baseConfig);
  }

  setToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async post<T>(url: string, inputs: URLSearchParams | string) {
    try {
      const { data } = await this.instance.post<any>(url, inputs);
      return data as T;
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
    }
  }

  async get<T>(url: string) {
    try {
      const { data } = await this.instance.get<any>(url);
      return data as T;
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
    }
  }

}

const customAxiosInstance = new CustomAxiosInstance();
export default customAxiosInstance;


// const instance = <T>(config: AxiosRequestConfig): Promise<T> => {
//   // Get default headers
//   const defaultHeaders = axios.defaults.headers.common;
//   // create new config
//   const newConfig = { ...config, headers: { ...defaultHeaders, ...config.headers } };
//   const source = axios.CancelToken.source();
//   const promise = AXIOS_INSTANCE({
//     ...newConfig,
//     cancelToken: source.token,
//   })
//     .then(({ data }) => data)
//     .catch((error: AxiosError) => {
//       // Catch 401 errors
//       if (
//         error.response &&
//         error.response.status &&
//         error.response.status === 401
//       ) {
//         signOut({
//           redirect: true,
//           callbackUrl: `${process.env.NEXT_PUBLIC_URL}/auth/signin`,
//         });
//       }
//       throw error;
//     });
//   promise.cancel = () => {
//     source.cancel('Query was cancelled by React Query');
//   };

//   return promise;
// };

// export default instance;


// Set config defaults when creating the instance
// const instance = axios.create(baseConfig);

// export const post = async <T>(url: string, inputs: URLSearchParams | string) => {
//   try {
//     const { data } = await instance(baseConfig).post<any>(url, inputs);
//     return data as T;
//   } catch (error) {
//     console.log('POST - ', axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
//     throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
//   }
// }

// export const get = async<T> (url: string, options: { token: string }) => {
//   const { token } =  options;
//   if (token) {
//     instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
//   }
//   try {
//     const { data } = await instance.get<any>(url);
//     return data as T;
//   } catch (error) {
//     throw new Error(axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred");
//   }
// }
// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// export default instance;
