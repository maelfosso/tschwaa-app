import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { signIn } from "../../../services/auth";
import customAxiosInstance from "../../../utils/axios";
import { SignInInputs } from "../../../types/requests";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-in',
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
        console.log('after signin', data);
        return data;
      }
    })
  ],
  callbacks: {
    async jwt (params) {
      const { token, user } = params;
      console.log('jwt ', user);
      if (user?.access_token) {
        token.accessToken = user.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      // customAxiosInstance.setToken(session.accessToken as string);
      return session;
    }
  }
}

export default NextAuth(authOptions);
