import customAxiosInstance from "../utils/axios";
import { API_AUTH_SIGN_IN, API_AUTH_SIGN_UP } from "../utils/constants";
import { SignInInputs, SignUpInputs } from "../types/requests";
import { fromJson, toJson } from "@/utils/utils";

export const signUp = async (inputs: SignUpInputs) => {
  const jsonInputs = toJson(inputs);
  console.log('sign up ', jsonInputs);

  return await customAxiosInstance.post<any>(API_AUTH_SIGN_UP, jsonInputs);
}

export const signIn = async (inputs: SignInInputs) => {
  const jsonInputs = JSON.stringify(inputs);

  return await customAxiosInstance.post<any>(API_AUTH_SIGN_IN, jsonInputs);
}
