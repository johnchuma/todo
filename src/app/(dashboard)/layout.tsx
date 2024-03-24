"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/app/components/sidebar";
import { useEffect, useState } from "react";
import { auth } from "@/app/utils/firebase";
import { signin } from "@/app/controllers/authControllers";
import { onAuthStateChanged } from "firebase/auth";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "To Do",
//   description: "This app helps to manage tasks and track progress and perfomance",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        
        <div className="flex text-textColor bg-backgroundColor">
          <div className="w-3/12 h-screen border-r-2 fixed  border-lineColor ">
             <Sidebar/>
          </div>
          <div className="w-9/12  ms-auto min-h-screen px-12 py-5">
            {children}
          </div>
        </div>
        
      </body>
    </html>
  );
}
