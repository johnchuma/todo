"use client"
import Image from "next/image";
import { signin } from "../controllers/authControllers";
import { useState } from "react";

const Page = () => {
    const [loading, setloading] = useState<Boolean>(false);
    return (<div className=" h-screen w-screen bg-gray-800 flex justify-center items-center">
      
      <div className=" w-10/12 md:w-4/12 bg-white rounded-2xl  ">
      <div className="text-center items-center flex flex-col">
      <Image alt="google" height={1000} width={1000} className="w-full rounded-t-2xl" src={`/woman.webp`}/>
       <div className="py-12 px-3 md:px-8">
       <h1 className=" text-lg md:text-2xl font-bold">SmartFoundry To Do</h1>
        <p className="mt-2 mb-4 px-2 md:px-5">Personalize your to-do list by logging in with your Google account.</p>
        <div onClick={()=>{
            signin()
        }} className="py-3 px-5 cursor-pointer rounded-xl hover:scale-105 transition-all duration-500 bg-primary font-bold text-sm flex justify-center items-center space-x-2">
            <Image alt="google" height={1000} width={1000} className="h-5 w-5" src={`/google.png`}/>
            <div>Continue with google</div>
        </div>
       </div>
        
      </div>
      </div>

    </div>  );
}
 
export default Page;