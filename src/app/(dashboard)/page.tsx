"use client"
import Image from "next/image";
import { auth } from "@/app/utils/firebase";
import { signin } from "@/app/controllers/authControllers";
import { useEffect, useState } from "react";
import { getUrgentTasks, updateTask } from "@/app/controllers/tasksController";
import { formatDate } from "@/app/utils/format_date";
import Chart from "react-apexcharts";
import { getDashboardData } from "@/app/controllers/dashboardController";
import { Timestamp } from "firebase/firestore";
export default function Home() {
  const [tasks, setTasks] = useState<any>([]);
  const state = {
    options:{

    },
    series: [60],
   
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "70%"
        },
       
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px"
          },
          value: {
            color: "#111",
            fontSize: "30px",

            show: true
          }
        }
      }
    },
  
    stroke: {
      lineCap: "round",
    },
    labels: ["Efficiency"]
  };

const [dashboardData, setDashboardData] = useState<any>(null);
const [loading, setloading] = useState<Boolean>(false);
const [showLogoutButton, setshowLogoutButton] = useState<Boolean>(false);
const [refresh, setrefresh] = useState<any>(0);
useEffect(() => {
 getUrgentTasks().then((data)=>{
   setTasks(data)
 })
}, [refresh]);
useEffect(() => {
  setloading(true)
  getDashboardData().then((data)=>{
    setDashboardData(data)
  setloading(false)
  })
 }, []);
  return loading?<div onClick={()=>{
    setshowLogoutButton(false)
  }} className="flex justify-center w-full h-screen items-center">
  <div className="h-12 w-12 border-4 rounded-full border-textColor border-t-transparent animate-spin"></div>
</div>: dashboardData&&(
   <main>


    <div className="flex justify-between">
      <div>
        <h1 className="font-bold text-2xl">Hello, {auth.currentUser?.displayName}</h1>
        <p className="text-mutedColor text-sm">Welcome</p>
      </div>
      <div className="relative">
        <Image onClick={()=>{
            setshowLogoutButton(!showLogoutButton)
        }} alt={`auth.currentUser?.displayName`} height={1000} width={1000} className="w-10 h-10 rounded-full" src={`${auth.currentUser?.photoURL}`}/>
     {
        showLogoutButton&&<div onClick={()=>{
            auth.signOut()
         }} className="absolute bg-white py-4 px-5 cursor-pointer right-0 shadow-lg z-50 rounded-lg text-sm">
            <h1 className=" text-red-500 font-bold">Logout</h1>
         </div>
     }
      </div>
    </div>
    <div className="w-full h-[1px] bg-lineColor mt-1"/>

     <div className="grid grid-cols-12 mt-8">
      <div className=" col-span-8">
        <div className="grid grid-cols-2 gap-8">
          {[
            {title:`${dashboardData.totalProjects} Projects`,subtitle:"Available projects",icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
          </svg>
           },
           {title:`${dashboardData.remainingTasks} Tasks`,subtitle:"Remaining tasks",icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
           <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
         </svg>
         
          },
          {title:`${dashboardData.completedTasks} Tasks`,subtitle:"Total done tasks",icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
        </svg>
        
         },
         {title:`${dashboardData.backlogTasks} Tasks`,subtitle:"Total backlogs",icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
         <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
         <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clipRule="evenodd" />
       </svg>
       
        }
          
        ].map((item)=>{
            return <div className="bg-white p-5 rounded-md w-full flex  items-center space-x-2">
                       <div className="h-14 w-14 rounded-full bg-primary bg-opacity-40 flex justify-center items-center text-[#86AF2E]">
                        {item.icon}
                       </div>
                       <div>
                        <h1 className="font-bold text-lg">{item.title}</h1>
                        <p className="text-mutedColor text-sm">{item.subtitle}</p>
                       </div>
            </div>
          })}
        </div>
      </div>
      <div className=" col-span-4 flex flex-col items-center z-0 justify-center">
        <h1 className="font-bold text-lg">Efficiency Overview</h1>
      <div className="z-0">
      <Chart  
    options={{ 
        labels: state.labels,
        stroke: {
            lineCap: "round"
        },
        colors: ["#FE5C73"],
        plotOptions: {
            radialBar: {
                track: {},
                hollow: {
                    size: "60%"
                },
                dataLabels: {
                    name: {
                        fontSize: "12px",
                        color: "#000000",
                        offsetY: 20
                    },
                    value: {
                        fontSize: "30px",
                        color: "#FE5C73",
                        offsetY: -15
                    }
                }
            }
        }
    }}
    series={[dashboardData.performancePercentage]}
    type="radialBar"
    width="100%"
    style={{ zIndex: 1 }} // Adjust z-index here
/>
      </div>
      </div>

     </div>
     <h1 className="mt-5 font-bold text-xl">Urgent tasks</h1>
     <div className="bg-white space-y-2 border border-slate-200  w-full py-8 mt-2 px-5 rounded-lg ">
        {tasks.length<1?<div className="flex flex-col justify-center items-center">
          <div>
            <Image alt="no" height={1000} width={1000} className="w-24"  src="/nodata.webp"/>
          </div>
          <div className=" text-mutedColor font-bold">
            No Data
          </div>
          </div>: tasks.map((item:any)=>{
           return<div onClick={()=>{

          }} className="flex justify-between cursor-pointer">
            <div className="flex items-center space-x-2">
            <input checked={false}  onChange={()=>{
              
              updateTask(item.id,{status:"Completed",completedAt:Timestamp.now()}).then((data)=>{
                setrefresh(refresh+1)
              })
            }} type="checkbox"/>
            <h1>{item.description}</h1>
            </div>
            
           <div className="flex space-x-1 font-semibold">
           <div className="flex text-xs space-x-4 items-center ">
   <div className="flex  space-x-2 items-center">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
     className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
    </svg>
    <h1>{formatDate(item.startDate.toDate())}</h1>
   </div>
   <div>-</div>
   <div className="flex  items-center">
    <h1>{formatDate(item.endDate.toDate())}</h1>
   </div>
   </div>
           </div>
          </div>
        })}
     </div>
   </main>
  );
}
