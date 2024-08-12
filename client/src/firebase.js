// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e9081.firebaseapp.com",
  projectId: "mern-estate-e9081",
  storageBucket: "mern-estate-e9081.appspot.com",
  messagingSenderId: "718541690197",
  appId: "1:718541690197:web:0e394f80753b2337800bdc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
