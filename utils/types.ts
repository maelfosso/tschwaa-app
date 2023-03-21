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

export interface Member {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  joined: boolean;
}

export interface JustInvitedMembers {
  phoneNumber: string;
  invited: boolean;
  error: string
}
