import { ReactNode } from "react";
import NextAuthProvider from "./provider";
import './global.css';
import { getServerSession, Session } from "next-auth";
import Layout from "../components/layout";

export const metadata = {
  title: 'Tschwaa',
  description: 'Tontine online'
}

interface LayoutProps {
  children: ReactNode
}

async function getSession(cookie: string): Promise<Session> {
  console.log('get session', process.env.NEXTAUTH_URL);
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.log('response - ', message);
    throw new Error(message);
  }
  console.log("Response JSON", await response.json());
  const session = await response.json();
  
  return Object.keys(session).length > 0 ? session : null;
}

const RootLayout = async ({ children }: LayoutProps ) => {
  return (
    <html>
      <body>
        <NextAuthProvider>
          <Layout>{ children }</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
