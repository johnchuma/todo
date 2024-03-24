// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVuHJm-j2JQuvEpqpyvKrfM5dkIPao3lk",
  authDomain: "smart-to-do-fd1c7.firebaseapp.com",
  projectId: "smart-to-do-fd1c7",
  storageBucket: "smart-to-do-fd1c7.appspot.com",
  messagingSenderId: "649251093380",
  appId: "1:649251093380:web:efa26e0954a9bfe1ee7bd1",
  measurementId: "G-1G5VGEEMCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const auth = getAuth(app)