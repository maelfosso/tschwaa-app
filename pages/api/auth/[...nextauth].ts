                                         import axios, { AxiosError } from "axios";
import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../services/auth";
import { catchAxiosError } from "../../../services/error";
import { SignInInputs } from "../../../utils/types";

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/sign-in',
    // signOut: '',
    // error: ''
  },
  providers: [
    CredentialsProvider({
      id: 'auth-signin',
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as SignInInputs;

        console.log('credentials - signin - ', username, password);
        try {
          const { data } = await signIn({ username, password });
          console.log('data ... ', data);
          return data;
        } catch (error) {
          const message = error instanceof AxiosError ? catchAxiosError(error) : { error: "error not understood yet"}
          console.log('error ... ', message);
          // return null;
          throw new Error(message.error);
        }
      }
    })
  ],
  // callbacks: {
  //   jwt (params) {
  //     // update the token
  //     if (params.user?.role) {
  //       params.token.role = params.user?.role;
  //     }
  //     // return the final token
  //     return params.token;
  //   }
  // }
}

export default NextAuth(authOptions);
