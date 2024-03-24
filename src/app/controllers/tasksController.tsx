import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { generateId } from "../utils/idGenerator";
import { auth, firestore } from "../utils/firebase";

export const addTask = async(data:any)=>{
    try {
        const id = generateId(10)
        const response = await setDoc(doc(firestore,"tasks",id), {
            id,
            createdAt: Timestamp.now(),
            userId:auth.currentUser?.email,
            ...data
        })
        return response;
    } catch (error) {
        throw error
    }
}
export const getTasksQuery =(id:any) => {
        const ref = collection(firestore, "tasks")
        let qr = query(ref,where("projectId","==",id),where("userId","==",auth.currentUser?.email), orderBy("createdAt","desc"))
        return qr
}
export const getUrgentTasks = async() => {
    try {
        const ref = collection(firestore, "tasks")
    let qr = query(ref,where("priority","==","High"),where("userId","==",auth.currentUser?.email),where("status","in",["To Do","In Progress"]), orderBy("createdAt","desc"))
    const response = await getDocs(qr)
    // alert(response.docs.length)
    return response.docs.map((item) => item.data())
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const updateTask = async ( id:any,data:any ) => {
    try {
      const response =   await updateDoc(doc(firestore,"tasks", id),data)
        return response;
    } catch (error) {
        throw error
    }
}
export const deleteTask = async ( id:any ) => {
    try {
        const response = await deleteDoc(doc(firestore,"tasks", id))
        return response;
    } catch (error) {
        throw error
    }
}