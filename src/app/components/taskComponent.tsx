"use client"
import { useState } from "react";
import { formatDate } from "../utils/format_date";
import { deleteTask, updateTask } from "../controllers/tasksController";
import { Timestamp } from "firebase/firestore";

const TaskComponent = ({item}:any) => {
    const [openModal, setopenModal] = useState<Boolean>(false);
    const [showOptions, setshowOptions] = useState<Boolean>(false);

    return ( <div>
        {openModal && <div className="  flex fixed justify-center items-center z-50 inset-0 bg-gray-900 bg-opacity-40">
        
        <div className={` w-5/12  p-8  bg-white rounded ` }>
                <div className="flex justify-between">
                <h1 className="font-bold  text-lg">Task</h1>
                <div onClick={()=>{
                    setopenModal(false)
                }} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </div>
                </div>  
                <div className="flex justify-between text-sm mt-5 relative">
        <h1>Priority</h1>
        {item.priority == "Low"?
        <div  onClick={()=>{
            setshowOptions(true)
        }} className="py-1 px-2 cursor-pointer rounded-full bg-gray-100 text-gray-600 font-bold text-xs ">Low</div>
        :<div onClick={()=>{
            setshowOptions(true)
        }} className="py-1 px-2 cursor-pointer rounded-full bg-red-100 text-red-600 font-bold text-xs ">High</div>
    }
    {showOptions==true&& <div className="absolute right-0 py-5 px-8 rounded shadow-lg space-y-1 bg-white z-50 ">
       {["Low","High"].map((priority)=>{
        return <div key={priority} onClick={()=>{
            updateTask(item.id,{priority})
            setshowOptions(false)
        }} className="cursor-pointer hover:text-indigo-600 font-bold  ">{priority}</div>
       })}
    </div>}
    </div>
   <textarea defaultValue={item.description} onChange={(e)=>{
    updateTask(item.id,{description:e.target.value})
   }} className="border-0 focus:ring-0 w-full text-xl px-0"></textarea>
   <div className="flex flex-wrap mt-2">
   {item.tags.map((item:any)=>{
    return <div className="rounded-full px-2 text-xs py-1 font-semibold"  style={{ backgroundColor:item.color+15,color:item.color }}>{item.name}</div>
   })}
   </div>
   <div className="flex text-xs space-x-4 items-center mt-5">
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
   <h1 className="mt-6 font-bold ">Change status</h1>
   <div className="grid grid-cols-4 mt-2 gap-3">
        {["On Backlogs","To Do","In Progress","Completed"].map((e)=>{
            return <div key={e} onClick={()=>{
                if(e=="Completed"){
                    updateTask(item.id,{status:e,completedAt:Timestamp.now()})
                }else{
                    updateTask(item.id,{status:e})
                }
                setopenModal(false)
            }} className={`${e==item.status?"bg-primary":"bg-slate-100"} cursor-pointer hover:scale-105 text-center font-semibold text-sm px-2 py-2`}>{e}</div>
        })}
   </div>

   <div onClick={()=>{
    setopenModal(false)
    deleteTask(item.id)
   }} className="flex justify-center mt-8 text-sm font-bold text-red-600 opacity-40 hover:opacity-90 cursor-pointer items-center">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
<h1>Delete task</h1>
   </div>
             </div>
        </div>}


















        <div className=""></div>
         <div onClick={()=>{
        setopenModal(true)
    }} className="bg-white w-full py-8 px-5 cursor-pointer hover:shadow-lg rounded-xl border border-lineColor">
    <div className="flex justify-between text-sm">
        <h1>Priority</h1>
        {item.priority == "Low"?
        <div className="py-1 px-2 rounded-full bg-gray-100 text-gray-600 font-bold text-xs ">Low</div>
        :<div className="py-1 px-2 rounded-full bg-red-100 text-red-600 font-bold text-xs ">High</div>
    }
    </div>
   <h1 className="text-xl mt-1">{item.description}</h1>
   <div className="flex flex-wrap mt-2">
   {item.tags.map((item:any)=>{
    return <div className="rounded-full px-2 text-xs py-1 font-semibold"  style={{ backgroundColor:item.color+15,color:item.color }}>{item.name}</div>
   })}
   </div>
   <div className="flex text-xs space-x-4 items-center mt-5">
   <div className="flex   items-center">
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
   );
}
 
export default TaskComponent;