import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  apiKey: "AIzaSyCzKKmkO5Xn9yktve_jjslNK6_Yk0ktZ7A",
  authDomain: "chatapp-49503.firebaseapp.com",
  projectId: "chatapp-49503",
  storageBucket: "chatapp-49503.appspot.com",
  messagingSenderId: "880233614342",
  appId: "1:880233614342:web:c5892c8a3e9e34b4f58787"
};

const app = initializeApp(firebaseConfig);

  
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();