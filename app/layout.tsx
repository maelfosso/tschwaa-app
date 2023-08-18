import { ReactNode } from "react";
import NextAuthProvider from "./provider";
import './global.css';
import { getServerSession, Session } from "next-auth";
import Layout from "../components/layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = {
  title: 'Tschwaa',
  description: 'Tontine online'
}

interface LayoutProps {
  children: ReactNode
}

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const session = await response.json();
  
  return Object.keys(session).length > 0 ? session : null;
}

const RootLayout = async ({ children }: LayoutProps ) => {
  const session = await getServerSession(authOptions);

  return (
    <html className="h-full">
      <body className="h-full">
        <NextAuthProvider>
          <Layout session={session}>{ children }</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
