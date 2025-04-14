// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBXNbi0LqhWuFlahqM4hxuSgvW0ZFfwt8",
  authDomain: "student-management-syste-717d5.firebaseapp.com",
  projectId: "student-management-syste-717d5",
  storageBucket: "student-management-syste-717d5.firebasestorage.app",
  messagingSenderId: "308132517554",
  appId: "1:308132517554:web:e8cf40f5619aa555e6dbab",
  measurementId: "G-D0LCW7THTZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
