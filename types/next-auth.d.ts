import NextAuth, { Account, DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    access_token?: string;
  }
}