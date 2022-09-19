import { post } from "../utils/axios";
import { API_AUTH_SIGN_IN, API_AUTH_SIGN_UP } from "../utils/constants";
import { SignInInputs, SignUpInputs } from "../utils/types";

export const signUp = async (inputs: SignUpInputs) => {
  const jsonInputs = JSON.stringify(inputs);

  return await post<boolean>(API_AUTH_SIGN_UP, jsonInputs);
}

export const signIn = async (inputs: SignInInputs) => {
  const jsonInputs = JSON.stringify(inputs);

  return await post<any>(API_AUTH_SIGN_IN, jsonInputs);
}
