import firebaseConfig from "./config/firebaseConfig";
import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/firebase-auth";
import {getFirestore} from "firebase/firebase-firestore";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };