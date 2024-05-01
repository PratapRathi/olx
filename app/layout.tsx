import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OLX - Free Classified in India",
  description: "OLX - Free Classified in India, Buy and sell for free in India",
  icons: { icon: "/favicon.png" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginModal/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
