import { useEffect, useState } from "react";
import { addTask } from "../controllers/tasksController";
import { getTags } from "../controllers/tagsController";
import { getActiveProject, getProjects } from "../controllers/projectsController";
import { onSnapshot } from "firebase/firestore";

const NewTask= ({refresh,setRefresh}:any) => {
    const [openModal, setopenModal] = useState<Boolean>(false);
   const [selectedColor, setselectedColor] = useState<String>("#000000");
   const [description, setdescription] = useState<String>("");
   const [projectId, setprojectId] = useState<String>("");

   const [startDate, setstartDate] = useState<Date>();
   const [endDate, setendDate] = useState<Date>();
   const [priority, setpriority] = useState<String>("");
   const [selectedTags, setselectedTags] = useState<any>([]);


   const [loading, setloading] = useState<Boolean>(false);
   const [tags, setTags] = useState<any>([]);
   const [activeProject, setActiveProject] = useState<any>(null);
   const [projects, setProjects] = useState<any>([]); 

   useEffect(() => {
    getTags().then((data)=>{
        setTags(data)
    })
    getProjects().then((data)=>{
        setProjects(data)
    })
    try {
    getActiveProject({setActiveProject})
        
    } catch (error) {
        console.log(error)
    }
   }, [refresh]);
    return ( <div className=" mt-4">

        <div onClick={()=>{
           setopenModal(true)
        }} className="flex space-x-2 items-center mt-3 cursor-pointer  justify-center bg-primary py-3 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
        stroke="currentColor" className="w-5 h-5 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <h1 className="font-bold text-sm">Add task</h1>
        </div>
        {openModal && <div className="  flex fixed justify-center items-center z-50 inset-0 bg-gray-900 bg-opacity-40">
        
        <div className={` w-5/12  p-8  bg-white rounded ` }>
                <div className="flex justify-between">
                <h1 className="font-bold  text-lg">Add new task</h1>
                <div onClick={()=>{
                    setopenModal(false)
                }} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </div>
                </div>  
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    setloading(true)
                   
                    const data = {
                        description,
                        priority,
                        endDate,
                        startDate,
                        completedAt:null,
                        tags:selectedTags,
                        projectId:projectId==""?activeProject.id:projectId,
                        status:'On Backlogs'
                    }
                    addTask(data).then((data)=>{
                       setloading(false)  
                       setopenModal(false)
                       setRefresh(refresh+1)
                    })
                }}>
                   <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="flex flex-col space-y-1 col-span-2">
                        <label className="text-sm">Task description</label>
                        <textarea onChange={(e)=>{
                            setdescription(e.target.value)
                        }}  name="name" required  placeholder="Write description" className="text-xl border-slate-400 rounded" />
                    </div>
                    <div className="flex flex-col space-y-1 col-span-2 ">
                        <label className="text-sm">Tags</label>
                        <div className="flex space-x-2 items-center">
                        <select
                        multiple
                        required
                        onChange={(e) => {
                            
                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                             const results =  tags.filter((item:any)=>selectedOptions.includes(item.name))
                            setselectedTags([...results.map((item:any)=>{return {name:item.name,color:item.color}})]);
                        }}
                        className="border-slate-400 rounded w-full text-sm"
                         // Set the value attribute to maintain selected options
                        >
                        {tags.map((item: any) => (
                            <option key={item.id} value={item.name}>
                            {item.name}
                            </option>
                        ))}
                        </select>

                        </div>
                    </div>
                    <div className="flex flex-col  space-y-1">
                        <label className="text-sm">Start date</label>
                        <div className="flex space-x-2 items-center">
                        <input type="date" required  onChange={(e)=>{
                          const date = new Date(e.target.value);
                            setstartDate(date)
                        }} placeholder="Enter taskname" className="border-slate-400 text-sm  rounded w-full" />
                   
                        </div>
                        
                    </div>
                    <div className="flex flex-col space-y-1 ">
                        <label className="text-sm">End date</label>
                        <div className="flex space-x-2 items-center">
                        <input type="date" required  onChange={(e)=>{
                             const date = new Date(e.target.value);
                             setendDate(date)
                        }} placeholder="Enter taskname" className="border-slate-400 text-sm  rounded w-full" />
                   
                        </div>
                        
                    </div>
                    <div className="flex flex-col space-y-1 ">
                        <label className="text-sm">Task priority</label>
                        <div className="flex space-x-2 items-center">
                        <select required  onChange={(e)=>{
                            setpriority(e.target.value)
                        }} className="border-slate-400 rounded w-full text-sm " >
                            <option >Select priority</option>
                            <option value="Low">Low</option>
                            <option value="High">High</option>

                        </select>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1 ">
                        <label className="text-sm">Select project</label>
                        <div className="flex space-x-2 items-center">
                        <select required defaultValue={activeProject.id}  onChange={(e)=>{
                            setprojectId(e.target.value)
                        }} className="border-slate-400 rounded w-full text-sm" >
                            <option>Select project</option>
                            {projects.map((item: any) => (
                            <option key={item.id} value={item.id}>
                            {item.name}
                            </option>
                        ))}

                        </select>
                        </div>
                    </div>
                    </div>   
                    <button type="submit" className="px-3 w-48 py-3 flex justify-center bg-primary hover:shadow font-bold text-sm mt-5">
                       {loading?<div className="border-2 h-4 w-4 border-t-transparent rounded-full animate-spin border-black"></div>:"Add task"}
                        
                        </button>
                </form>    
             </div>
        </div>}
    </div> );
}
 
export default NewTask;