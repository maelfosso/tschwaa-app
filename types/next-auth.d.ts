import NextAuth, { Account, DefaultSession, DefaultUser, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User extends DefaultUser {
    access_token?: string;
  }
}