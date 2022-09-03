import { AxiosError } from "axios"

export type ErrorResponse = {
  error: string
}

export function catchAxiosError(error: AxiosError): ErrorResponse {
  let message = "Something happened in setting up the request that trigger the error";

  if (error.response) {
    message = error.response.data as string;
  } else if (error.request) {
    message = "The request was made, but no response was received";
  }

  return { error: message };
}
