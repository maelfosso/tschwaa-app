"use client";

import { Session } from "next-auth";
import { Fragment, ReactNode } from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode,
  session: Session | null
}

const Layout = ({ children, session }: LayoutProps ) => {
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
    <Fragment>
      <Navbar user={session?.user!!} />
      {/* <main className="flex-1 pb-8">{children}</main> */}
      { children }
    </Fragment>
  );
}

export default Layout;
