import { ReactElement } from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactElement
}

const Layout = ({ children }: LayoutProps ) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
