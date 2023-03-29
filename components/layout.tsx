"use client";

import { ReactNode } from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
  // const router = useRouter();
  // const session = useSession();

  // // if (session.status === 'loading') {
  // //   return <div className="loading" />
  // // }

  // if (session.status === 'authenticated') {
  //   customAxiosInstance.setToken(session.data.accessToken as string)
  // }

  // if (router.pathname === '/auth/sign-in' && session.status === 'authenticated') {
  //   router.push('/orgs')
  // }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <main className="flex-1 pb-8">{children}</main>
    </div>
  );
}

export default Layout;
