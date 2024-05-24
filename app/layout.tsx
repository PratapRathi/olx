import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SellModal from "@/app/components/modals/SellModal";
import AuthContext from "@/app/context/AuthContext";
import { Suspense } from "react";

const font = Nunito({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "OLX - Free Classified in India",
  description: "OLX - Free Classified in India, Buy and sell for free in India",
  icons: { icon: "/favicon.png" }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthContext>
          <ToasterProvider />
          <LoginModal />
          <SellModal />
          <Suspense>
            <Navbar currentUser={currentUser} />
          </Suspense>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
