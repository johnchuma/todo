"use client"
import { useEffect, useState } from "react";
import NewTask from "./newTask";
import NewProject from "./newProject";
import Tags from "./tags";
import path from "path";
import Link from "next/link";
import { getActiveProject } from "../controllers/projectsController";
import { getDashboardData } from "../controllers/dashboardController";

const Sidebar = ({showMenu,setShowMenu}:any) => {
    const [openModal, setopenModal] = useState<Boolean>(false);
    const [projects, setProjects] = useState<any>([]);
   const [activeProject, setActiveProject] = useState<any>(null);
const [dashboardData, setDashboardData] = useState<any>(null);
const [percent, setPercent] = useState<any>(0);
const [refresh, setRefresh] = useState<any>(false);

useEffect(() => {
    getDashboardData().then((data)=>{
        setDashboardData(data)
        const calculatedValue = (data.completedTasks*100)/(data.completedTasks+data.remainingTasks)
        setPercent(calculatedValue)
    })
}, []);
    useEffect(() => {
        getActiveProject({setActiveProject})
    }, [refresh]);
    return ( <div className=" h-full">
        <div className="px-5">
        <div className="flex space-x-2 mt-8 px-5 justify-between md:justify-start items-center">
        <h1 className="text-textColor font-bold text-lg  block md:hidden">Menu</h1>
      
        <svg onClick={()=>{
            setShowMenu(false)
        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer block md:hidden">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="currentColor"
         className="w-5 h-5  hidden md:block">
        <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
        </svg>
        <h1 className="text-textColor font-bold text-lg  hidden md:block">Smart To Do</h1>
        </div>
       
        {activeProject != null && <NewTask refresh={refresh} setRefresh={setRefresh}/> }
        
        <div className="space-y-3 mt-8">
        {[
            {title:"Dashboard",path:`/`, icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
          </svg>
        }
    ].map((item,index)=>{
            return  <Link href={item.path} className="flex px-5 space-x-3 items-center font-semibold">
                {item.icon}
                <h1>{item.title}</h1>
            </Link>
        })}


        {activeProject != null && 
              [
                {title:"Task List",path:`/taskList/${activeProject&&activeProject.id}`, icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
              
               }
            ].map((item,index)=>{
                    return  <Link href={item.path} className="flex px-5 space-x-3 items-center font-semibold">
                        {item.icon}
                        <h1>{item.title}</h1>
                    </Link>
                })
        }
       <div>
       <div className="flex px-5 space-x-3  font-semibold justify-between items-center">
        <div className="flex space-x-3 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
         stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
        </svg>
         <h1>Projects</h1>
        </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        <NewProject refresh={refresh} setRefresh={setRefresh} />
       </div>
        <Tags/>
           
           
        </div>
       
        </div>
        {dashboardData&&<div className="fixed bottom-4 w-3/12 px-10 ">
           <div className="flex space-x-3 items-center font-semibold ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

                <h1>Completion</h1>
            </div>
            <div className="h-1 bg-gray-800 w-full  my-2">
            <div className={`h-1 bg-primary`} style={{ width:`${percent}%` }}></div>
            </div>
            <div className="flex justify-between font-semibold">
                <h1>Tasks</h1>
                <h1>{dashboardData.completedTasks}/{dashboardData.completedTasks+dashboardData.remainingTasks}</h1>
            </div>
           </div>}

    </div> );
}
 
export default Sidebar;