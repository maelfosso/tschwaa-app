export type SignUpInputs = {
  firstname: string
  lastname: string
  email: string
  phone: string
  password: string
}

export type SignInInputs = {
  username: string
  password: string
}

export type ErrorWithMessage = {
  message: string
}
