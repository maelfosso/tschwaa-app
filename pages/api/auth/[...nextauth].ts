import axios from "axios";
import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../services/auth";
import customAxiosInstance from "../../../utils/axios";
import { SignInInputs } from "../../../utils/types";

export const authOptions: NextAuthOptions = {
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
        console.log('next-auth credentials : ', username, password);
        const data = await signIn({ username, password });
        console.log('next-auth - ', data);
        data['name'] = data.firstname + ' ' + data.lastname;
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
      session.accessToken = token.accessToken;
      customAxiosInstance.setToken(session.accessToken as string);
      return session;
    }
  }
}

export default NextAuth(authOptions);
