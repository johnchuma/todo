import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import {auth} from "@/app/utils/firebase";

export const signin = async ()=>{
    try {
        const provider = new GoogleAuthProvider()
        await signInWithRedirect(auth,provider)
    } catch (error) {
        console.log(error)
        throw error
    }
}