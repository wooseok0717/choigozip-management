// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDWh-4uUjgIH-6ATSDrUDr0VT9wcIYBkMA",
  authDomain: "choigozip-management.firebaseapp.com",
  projectId: "choigozip-management",
  storageBucket: "choigozip-management.appspot.com",
  messagingSenderId: "742326451839",
  appId: "1:742326451839:web:5a78a4d8e37cace65e494a",
  measurementId: "G-6JVFP4T703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};