import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp, where } from "firebase/firestore";
import { generateId } from "../utils/idGenerator";
import { auth, firestore } from "../utils/firebase";

export const addProject = async(data:any)=>{
    try {
        const id = generateId(10)
        const response = await setDoc(doc(firestore,"projects",id), {
            id,
            createdAt: Timestamp.now(),
            isActive:false,
            userId:auth.currentUser?.email,
            ...data
        })
        return response;
    } catch (error) {
        throw error
    }
}
export const addActiveProject = async(data:any)=>{
    try {
        const id = generateId(10)
        const response = await setDoc(doc(firestore,"projects","active"+auth.currentUser?.email), {
            isActive:true,
            ...data
            
        })
        return response;
    } catch (error) {
        throw error
    }
}
export const getProjects = async () => {
    try {
        const ref = collection(firestore, "projects")
        let qr = query(ref,where("userId","==",auth.currentUser?.email),where("isActive","==",false), orderBy("createdAt","desc"))
        const response = await getDocs(qr)
        return response.docs.map((item) => item.data());
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getActiveProject =  ({setActiveProject}:any) => {
    try {
        const ref = doc(firestore,"projects", "active"+auth.currentUser?.email)
        // const qr = query(ref,where("userId","==",auth.currentUser?.email))
        let project = null;
        onSnapshot(ref,((snapshot)=>{
            if(snapshot.exists()){
              project= snapshot.data()
              setActiveProject(project)
            }else{
             getProjects().then((response)=>{
                project = response[0]
                setActiveProject(project)
             })
            } 
        }))
        return project    
    } catch (error) {
        throw error
    }
}
export const getProject = async ( id:any ) => {
    try {
        const response = await getDoc(doc(firestore,"projects", id))
        if(response.exists()){
            return response.data()
        }
        return null;
    } catch (error) {
        throw error
    }
}
export const deleteProject = async ( id:any ) => {
    try {
        const response = await deleteDoc(doc(firestore,"projects", id))
        return response;
    } catch (error) {
        throw error
    }
}