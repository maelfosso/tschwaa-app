import axios from "axios";
import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../services/auth";
import customAxiosInstance from "../../../utils/axios";
import { SignInInputs } from "../../../utils/types";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
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
  callbacks: {
    async jwt (params) {
      const { token, user } = params;
      if (user?.access_token) {
        token.accessToken = user.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      console.log('session token : ', session, token);
      session.accessToken = token.accessToken;
      customAxiosInstance.setToken(session.accessToken as string);
      return session;
    }
  }
}

export default NextAuth(authOptions);
