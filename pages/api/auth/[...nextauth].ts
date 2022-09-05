                                         import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { username, password } = credentials as SignInInputs;
        if (username !== 'me@mail.com' || password !== "1234") {
          throw new Error('invalid credentials');
        }

        return {
          id: '1234',
          name: 'Josh Doe',
          email: 'me@mail.com'
        }
      }
    })
  ],
  callbacks: {
    jwt (params) {
      // update the token
      if (params.user?.role) {
        params.token.role = params.user?.role;
      }
      // return the final token
      return params.token;
    }
  }
}

export default NextAuth(authOptions);
