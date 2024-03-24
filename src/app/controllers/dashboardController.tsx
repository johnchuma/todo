import { collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp, where } from "firebase/firestore";
import { generateId } from "../utils/idGenerator";
import { auth, firestore } from "../utils/firebase";

export const getDashboardData = async () => {
    try {
        const projectRef = collection(firestore, "projects")
        const tasksRef = collection(firestore, "tasks")

        let projectsQuery = query(projectRef,where("userId","==",auth.currentUser?.email),where("isActive","==",false))
        let remainingTaskQuery = query(tasksRef,where("status","in",["To Do","In Progress"]),where("userId","==",auth.currentUser?.email))
        let completedTaskQuery = query(tasksRef,where("status","==","Completed"),where("userId","==",auth.currentUser?.email))
        let backlogTaskQuery = query(tasksRef,where("status","==","On Backlogs"),where("userId","==",auth.currentUser?.email))
        const completedOnTimeQuery = query(tasksRef, where("status", "==", "Completed"),where("userId", "==", auth.currentUser?.email),where("completedAt", "<=", "endDate"));
        const tasksSnapshot = await getDocs(completedTaskQuery);
        let completedOnTimeCount = 0;
        tasksSnapshot.forEach(taskDoc => {
            const taskData = taskDoc.data();
            if ( taskData.completedAt <= taskData.endDate) {
                completedOnTimeCount++;
            }
        });
        const projectsResponse = await getCountFromServer(projectsQuery)
        const remainingTaskResponse = await getCountFromServer(remainingTaskQuery)
        const completedTaskResponse = await getCountFromServer(completedTaskQuery)
        const backlogTaskResponse = await getCountFromServer(backlogTaskQuery)
        let performancePercentage = 0;
        if (completedTaskResponse.data().count > 0) {
            performancePercentage = (completedOnTimeCount * 100) / completedTaskResponse.data().count;
        }
        const data = {
             totalProjects:projectsResponse.data().count,
             remainingTasks:remainingTaskResponse.data().count,
             completedTasks:completedTaskResponse.data().count,
             backlogTasks:backlogTaskResponse.data().count,
             performancePercentage
        };
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}
