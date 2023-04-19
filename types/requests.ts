export type SignUpInputs = {
  firstName: string
  lastName: string
  sex: string
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
