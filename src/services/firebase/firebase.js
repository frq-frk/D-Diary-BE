import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "ddiary-v1.firebaseapp.com",
    projectId: "ddiary-v1",
    storageBucket: "ddiary-v1.appspot.com",
    messagingSenderId: "1002434576113",
    appId: "1:1002434576113:web:cc50ffcc698462b0bdb350"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);