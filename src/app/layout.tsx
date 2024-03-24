"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { useEffect, useState } from "react";
import { auth } from "./utils/firebase";
import { signin } from "./controllers/authControllers";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
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
  const [loading, setloading] = useState<Boolean>(true);
  const path = usePathname()
  const router = useRouter()
  useEffect(() => {
    setloading(true)
   onAuthStateChanged(auth,(user)=>{
    if(user){
      if(!['/login','/'].includes(path)){
        router.push(path)
      }else{
        router.push("/")
      }
      setTimeout(() => {
       setloading(false)
      }, 2000);
    }
    else{
      router.push("/login")
      setTimeout(() => {
        setloading(false)
       }, 2000);
    }
   })
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
     { loading?<div className="flex justify-center w-screen h-screen items-center">
            <div className="h-12 w-12 border-4 rounded-full border-textColor border-t-transparent animate-spin"></div>
          </div>:children}
      </body>
    </html>
  );
}
