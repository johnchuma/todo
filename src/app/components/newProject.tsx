import { useEffect, useState } from "react";
import { addActiveProject, addProject, deleteProject, getProjects } from "../controllers/projectsController";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewProject = ({refresh,setRefresh}:any) => {
    const [openModal, setopenModal] = useState<Boolean>(false);
   const [selectedColor, setselectedColor] = useState<String>("#000000");
   const [name, setName] = useState<String>("");

   const [loading, setloading] = useState<Boolean>(false);
   const [projects, setProjects] = useState<any>([]);
   const router = useRouter()
   useEffect(() => {
    getProjects().then((data)=>{
        setProjects(data)
    })
   
   }, [refresh]);
    return ( <div className=" ms-12 mt-4">

       <div className="space-y-2">
       {projects.map((item:any)=>{
            return <button onClick={()=>{
                router.push(`/taskList/${item.id}`)
                item.isActive = true,
                addActiveProject(item)          
            }}  className="flex space-x-1 text-start items-center w-full justify-between cursor-pointer hover:font-bold">
                <div className="flex space-x-1 items-center">
                <div className={`h-4 w-4 aspect-square`} style={{ backgroundColor:item.color }}/>
                <h1 className=" line-clamp-1">{item.name}</h1>
                </div>
                <svg onClick={()=>{
                   deleteProject(item.id).then((data)=>{
                    setRefresh(refresh+1)
                   })
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="w-4 h-4 hover:text-red-500 text-mutedColor">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>

            </button>
        })}
       </div>
        <div onClick={()=>{
           setopenModal(true)
        }} className="flex space-x-2 items-center mt-3 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
        stroke="currentColor" className="w-5 h-5 text-mutedColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <h1 className=" text-mutedColor">Add project</h1>
        </div>
        {openModal && <div className="  flex fixed justify-center items-center z-50 inset-0 bg-gray-900 bg-opacity-40">
        
        <div className={` w-5/12  p-8  bg-white rounded ` }>
                <div className="flex justify-between">
                <h1 className="font-bold  text-lg">Add new project</h1>
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
                        name,
                        color: selectedColor
                    }
                    addProject(data).then((data)=>{
                       setloading(false)  
                       setopenModal(false)
                       setRefresh(refresh+1)
                    })
                }}>
                   <div className="grid grid-cols-2 gap-5 mt-3">
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Project name</label>
                        <input onChange={(e)=>{
                            setName(e.target.value)
                        }}  name="name" required type="text" placeholder="Enter project name" className="text-sm border-slate-400 rounded" />
                    </div>
                    <div className="flex flex-col ">
                        <label className="text-sm">Select color</label>
                        <div className="flex space-x-2 items-center">
                        <input name="color" required type="color" onChange={(e)=>{
                            setselectedColor(e.target.value)
                        }} placeholder="Enter project name" className="border-slate-400 h-10 w-10 aspect-square rounded" />
                    <div>{selectedColor}</div>
                        </div>
                        
                    </div>
                    </div>   
                    <button type="submit" className="px-3 w-48 py-3 flex justify-center bg-primary hover:shadow font-bold text-sm mt-5">
                       {loading?<div className="border-2 h-4 w-4 border-t-transparent rounded-full animate-spin border-black"></div>:"Add project"}
                        
                        </button>
                </form>    
             </div>
        </div>}
    </div> );
}
 
export default NewProject;