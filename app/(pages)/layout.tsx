import React, { ReactNode } from "react";
import Navbar from "../component/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="">
      <Navbar />
      {children}
    </main>
  );
};


export default Layout;
