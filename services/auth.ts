import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Router from "next/router";
import { SignUpInputs } from "../utils/types";
import { catchAxiosError, ErrorResponse } from "./error";

export const signUp = async (inputs: SignUpInputs) => {
  const jsonInputs = JSON.stringify(inputs);

  return await post<boolean>("/auth/signup", jsonInputs);
  // const res: ErrorResponse | AxiosResponse<boolean, any> = 
  // if ((res as ErrorResponse)) {
  //   return (res as ErrorResponse).error;
  // }

  // await Router.push('/auth/sig-in');
}

const baseConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:8080",
  headers: {
    'Content-Type': 'applicatin/json',
    'Accept': 'application/json'
  }
}

async function post<T>(url: string, inputs: URLSearchParams | string) {
  try {
    const { data } = await axios.post<T>(url, inputs, baseConfig);
    return data as T;
  } catch (error) {
    console.log('post error ', error);
    return axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred";
  }
}
