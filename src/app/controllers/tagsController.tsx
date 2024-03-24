import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, Timestamp, where } from "firebase/firestore";
import { generateId } from "../utils/idGenerator";
import { auth, firestore } from "../utils/firebase";

export const addTag = async(data:any)=>{
    try {
        const id = generateId(10)
        const response = await setDoc(doc(firestore,"tags",id), {
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
export const getTags = async () => {
    try {
       
        const ref = collection(firestore, "tags")
        let qr = query(ref,where("userId","==",auth.currentUser?.email), orderBy("createdAt","desc"))
        const response = await getDocs(qr)
        return response.docs.map((item) => item.data());
    } catch (error) {
        console.log(error)
        // throw error
    }
}

export const deleteTag = async ( id:any ) => {
    try {
        const response = await deleteDoc(doc(firestore,"tags", id))
        return response;
    } catch (error) {
        throw error
    }
}