'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { motion } from "framer-motion";
import "./globals.css";
import ApolloClientProvider from "@/components/ApolloClientProvider";
import { AuthProvider } from '@/contexts/AuthContext';
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <ApolloClientProvider>
          <AuthProvider>
            <Header />
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ width: "100%" }}
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </AuthProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
