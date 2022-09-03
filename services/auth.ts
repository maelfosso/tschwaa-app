import axios, { AxiosRequestConfig } from "axios";
import { API_AUTH_SIGN_IN, API_AUTH_SIGN_UP } from "../utils/constants";
import { SignInInputs, SignUpInputs } from "../utils/types";
import { catchAxiosError } from "./error";

export const signUp = async (inputs: SignUpInputs) => {
  const jsonInputs = JSON.stringify(inputs);

  return await post<boolean>(API_AUTH_SIGN_UP, jsonInputs);
}

export const signIn = async (inputs: SignInInputs) => {
  console.log('auth - signIn ', inputs);
  const jsonInputs = JSON.stringify(inputs);

  return await post<any>(API_AUTH_SIGN_IN, jsonInputs);
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
    console.log('post T ', data);
    return data as T;
  } catch (error) {
    console.log('post error ', error);
    return axios.isAxiosError(error) ? catchAxiosError(error).error : "An unexpected error occurred";
  }
}
