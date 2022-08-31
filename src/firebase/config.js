// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT-wGqwnUT4IbLD7xvVeOWednMwukbCos",
  authDomain: "learning-react-d85de.firebaseapp.com",
  projectId: "learning-react-d85de",
  storageBucket: "learning-react-d85de.appspot.com",
  messagingSenderId: "944115845474",
  appId: "1:944115845474:web:365e0a3c8d2a949098c43b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);


