import { useEffect, useState } from "react";
import { addTag, deleteTag, getTags } from "../controllers/tagsController";
import { addProject } from "../controllers/projectsController";
import { auth } from "../utils/firebase";

const Tags = () => {
    const [openModal, setopenModal] = useState<Boolean>(false);
    const [selectedColor, setselectedColor] = useState<String>("");
    const [name, setName] = useState<String>("");
    const [loading, setloading] = useState<Boolean>(false);
    const [tags, setTags] = useState<any>([]);
    const [refresh, setrefresh] = useState<any>(0);
 
    useEffect(() => {
        if(auth.currentUser){
            getTags().then((data)=>{
                setTags(data)
            })
        }
       }, [refresh]);
    return (  <div>
        <div onClick={()=>{
            setopenModal(true)
        }} className="flex px-5 space-x-3 cursor-pointer z-auto font-semibold justify-between items-center">
        <div className="flex space-x-3 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
         stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
                <h1>Tags</h1>
        </div>
            </div>
            {openModal && <div className="  flex fixed justify-center items-center inset-0 z-50 bg-gray-900 bg-opacity-40">
        
        <div className={` w-8/12  p-8  bg-white rounded ` }>
                <div className="flex justify-between">
                <h1 className="font-bold  text-lg">Tags</h1>
                <div onClick={()=>{
                    setopenModal(false)
                }} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </div>
                </div>  
                <form className="flex justify-between" onSubmit={(e)=>{
                    e.preventDefault()
                    setloading(true)
                   
                    const data = {
                        name,
                        color: selectedColor
                    }
                    addTag(data).then((data)=>{
                        setloading(false)  
                        setrefresh(refresh+1)
                     })
                }}>
                   <div className="grid grid-cols-2 gap-5 mt-3">
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Tag name</label>
                        <input onChange={(e)=>{
                            setName(e.target.value)
                        }}  name="name" required type="text" placeholder="Enter tag name" className="text-sm border-slate-400 rounded" />
                    </div>
                    <div className="flex flex-col ">
                        <label className="text-sm">Select color</label>
                        <div className="flex space-x-2 items-center">
                        <input name="color" required type="color" onChange={(e)=>{
                            setselectedColor(e.target.value)
                        }} placeholder="Enter tag name" className="border-slate-400 h-10 w-10 aspect-square rounded" />
                    <div>{selectedColor}</div>
                        </div>
                        
                    </div>
                    </div>   
                    <button type="submit" className="px-3 w-48 py-3 items-center flex justify-center bg-primary hover:shadow font-bold text-sm mt-5">
                       {loading?<div className="border-2 h-4 w-4 border-t-transparent rounded-full animate-spin border-black"></div>:"Add"}
                        
                        </button>
                </form>   
    
                <div className="flex flex-wrap mt-5 ">  
                {tags.map((item:any)=>{
                    return <div key={item.id} style={{ backgroundColor:item.color+15,color:item.color }} 
                    className="border space-x-2 cursor-pointer  items-center flex font-bold text-sm bg-opacity-15 border-slate-300 me-2 mb-2 py-2 px-2 rounded-full">
                        <h1>{item.name}</h1>
                        <svg onClick={()=>{
                            deleteTag(item.id).then((data)=>{
                                setrefresh(refresh+1)
                            })
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                        stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                        </div>
                })}
                </div>
             </div>
        </div>}
    </div>);
}
 
export default Tags;