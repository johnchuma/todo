"use client"
import TaskComponent from "@/app/components/taskComponent";
import { getProject, getProjects } from "@/app/controllers/projectsController";
import { getTasksQuery } from "@/app/controllers/tasksController";
import { formatDate } from "@/app/utils/format_date";
import { onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TaskList = ({params}:any) => {
    const id = params.uuid;
    const [project, setproject] = useState<any>(null);
    const [tasks, setTasks] = useState<any>([]);
    const [selectedTab, setselectedTab] = useState<any>(0);
    const [projects, setProjects] = useState<any>([]);
    const router = useRouter()
    const [keyword, setkeyword] = useState<String>("");
    const [loading, setloading] = useState<Boolean>(false);

    useEffect(() => {
       setloading(true)
        getProject(id).then((data:any)=>{
            if(data){
              setproject(data)
              getProjects().then((data:any)=>{
                setProjects(data)
                setloading(false)
            })
            }
            
        })
    }, []);
   
    useEffect(() => {
        onSnapshot(getTasksQuery(id),((snapshots:any)=>{
            const data =  snapshots.docs.map((item:any) => item.data())
            setTasks(data)
        }))
       
    }, []);
    return (loading?<div className="flex justify-center w-full h-screen items-center">
    <div className="h-12 w-12 border-4 rounded-full border-textColor border-t-transparent animate-spin"></div>
  </div>:project&& <div>
       <div className="flex ">
        <div className="flex items-center space-x-2">
        <div className={`h-7 w-7 flex justify-center items-center`} style={{ backgroundColor:project.color }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 text-white h-4">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>

        </div>
     
            <select onChange={(e)=>{
                router.push(`/taskList/${e.target.value}`)
            }} className="font-bold text-2xl border-0 focus:border-0 focus:ring-0 bg-transparent  " defaultValue={project.id}>
               {projects.map((item:any)=>{
                return <option key={item.id} value={item.id}>{item.name}</option>
               })}
            </select>
        </div>
       </div>
       <div className="grid grid-cols-3 gap-5 mt-5">
        {[{title:"Workflow",count:0, icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
            </svg>},
            {title:"Backlogs",count:tasks.filter((item:any)=>item.status=="On Backlogs").length, icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
            <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clipRule="evenodd" />
            </svg>},
            {title:"Urgent Tasks",count:tasks.filter((item:any)=>item.priority=="High" && ["To Do","In Progress"].includes(item.status)).length, icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
            </svg>},

            
            
        ].map((item,index)=>{
            return <div key={index}>
            <div onClick={()=>{
                setselectedTab(index)
            }} className="flex space-x-2 justify-center cursor-pointer text-center font-bold items-center ">
                {item.icon}
                <h1>{item.title} {index!=0&&`(${item.count})`}</h1>
              </div>
              {index==selectedTab&&<div className="w-full h-1 mt-2 bg-primary"/>}
              </div>
        })}
            
            
       </div>
       <div className="w-full h-[1px] bg-lineColor "/>
      <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
      className="w-5 h-5">
        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
        </svg>
       <input onChange={(e)=>{
        setkeyword(e.target.value)
       }} placeholder="Search something" className="border-0 w-full bg-backgroundColor py-3 focus:ring-0"/>
      </div>

       <div className="w-full h-[1px] bg-lineColor"/>
       {selectedTab==0&&<div className="grid grid-cols-3 gap-5 mt-5">
        <div>
        <h1 className="text-mutedColor font-bold">To Do</h1>
        <div className="mt-2 space-y-3">
            {tasks.filter((item:any)=>item.description.toLowerCase().includes(keyword.toString())).filter((item:any)=>item.status=="To Do").map((item:any)=>{
                return <div key={item.id}><TaskComponent item={item}/></div>
                
            })}
        </div>
        </div>
        <div>
        <h1 className="text-mutedColor font-bold">In Progress</h1>
        <div className="mt-2 space-y-3">
            {tasks.filter((item:any)=>item.description.toLowerCase().includes(keyword.toString())).filter((item:any)=>item.status=="In Progress").map((item:any,index:any)=>{
                return <div key={item.id}><TaskComponent item={item}/></div>
                
            })}
        </div>
        </div>
        <div>
        <h1 className="text-mutedColor font-bold">Completed</h1>
        <div className="mt-2 space-y-3">
            {tasks.filter((item:any)=>item.description.toLowerCase().includes(keyword.toString())).filter((item:any)=>item.status=="Completed").map((item:any)=>{
                return <div key={item.id}><TaskComponent item={item}/></div>
                
            })}
        </div>
        </div>
       </div>}

       {selectedTab==1&&<div className="grid grid-cols-3 gap-5 mt-5">
        {tasks.filter((item:any)=>item.description.toLowerCase().includes(keyword.toString())).filter((item:any)=>item.status=="On Backlogs").map((item:any)=>{
                return <div key={item.id}><TaskComponent item={item}/></div>
                
            })}
       </div>}

       {selectedTab==2&&<div className="grid grid-cols-3 gap-5 mt-5">
        {tasks.filter((item:any)=>item.description.toLowerCase().includes(keyword.toString())).filter((item:any)=>item.priority=="High" && ["To Do","In Progress"].includes(item.status)).map((item:any)=>{
                return <div key={item.id}><TaskComponent item={item}/></div>
                
            })}
       </div>}
    </div> );
}
 
export default TaskList;