import { ReactElement } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactElement
}

const Layout = ({ children }: LayoutProps ) => {
  return (
    <div className="h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
