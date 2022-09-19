import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../services/auth";
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

        const data = await signIn({ username, password });
        return data;
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
