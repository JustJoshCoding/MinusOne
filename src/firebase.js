import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebaseConfig from "./config/firebaseConfig";
import "firebase/storage";

const firebaseApp = initializeApp(firebaseConfig);


const auth = getAuth(); // For Authentication
const db = getFirestore(); // For Using Database
const storage = getStorage();

export {  auth, db, storage };
