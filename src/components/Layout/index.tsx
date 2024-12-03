import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { AuthProvider } from "../AuthProvider/AuthProvider";
interface LayoutProps {
  children: ReactNode; // Указываем, что children могут быть любого типа, который поддерживает React
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default Layout;
