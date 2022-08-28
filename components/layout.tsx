import { ReactElement } from "react";
import Navbar from "./Navbar";

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
