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
const [showMenu, setShowMenu] = useState<Boolean>(true);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="block md:hidden bg-primary px-5 md:px-10 py-3 fixed w-full z-40  ">
          <div className="flex space-x-2 items-center">
          <svg onClick={()=>{
            setShowMenu(true)
          }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>

        <h1 className="text-textColor font-bold text-lg">Smart To Do</h1>
          </div>
       

        </div>
        <div className="flex text-textColor bg-backgroundColor">
          {showMenu&& <div className="  w-10/12 md:w-3/12 h-screen border-r-2 fixed z-40 bg-backgroundColor  border-lineColor ">
             <Sidebar setShowMenu={setShowMenu} showMenu={showMenu}/>
          </div>}
          
          <div className="w-full  md:w-9/12  ms-auto min-h-screen px-5 md:px-12 py-5">
            {children}
          </div>
        </div>
        
      </body>
    </html>
  );
}
