import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import customAxiosInstance from "../utils/axios";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactElement
}

const Layout = ({ children }: LayoutProps ) => {
  const router = useRouter();
  const session = useSession();

  // if (session.status === 'loading') {
  //   return <div className="loading" />
  // }

  if (session.status === 'authenticated') {
    customAxiosInstance.setToken(session.data.accessToken as string)
  }

  if (router.pathname === '/auth/sign-in' && session.status === 'authenticated') {
    router.push('/orgs')
  }

  return (
    <div className="h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
