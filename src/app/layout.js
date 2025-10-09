import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import ProvidersWrapper from "@/app/ProvidersWrapper/ProvidersWrapper"; 
import Footer from "@/app/components/Footer";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BlogCraft",
  description: "AI Blog Management Platform",
    icons: {
    icon: "/favicon.ico",  
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersWrapper>
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
