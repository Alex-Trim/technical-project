import type { Metadata } from "next";
import Footer from "@/shared/components/footer";
import Header from "@/shared/components/header";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Weapon | Goods",
  description: "Weapon Goods магазин оружия",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        {children} {modal}
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
