// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();


// Your web app's Firebase configuration
// const firebaseConfig = {
  // apiKey: "AIzaSyCT-wGqwnUT4IbLD7xvVeOWednMwukbCos",
  // authDomain: "learning-react-d85de.firebaseapp.com",
  // projectId: "learning-react-d85de",
  // storageBucket: "learning-react-d85de.appspot.com",
  // messagingSenderId: "944115845474",
  // appId: "1:944115845474:web:365e0a3c8d2a949098c43b"
// };

// Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyBiCfs-BVGk1Hx5uoxY0XJx9LnU2-B-Hp8",
//   authDomain: "testing-70545.firebaseapp.com",
//   projectId: "testing-70545",
//   storageBucket: "testing-70545.appspot.com",
//   messagingSenderId: "336030712533",
//   appId: "1:336030712533:web:5fc4ace8186d052e8bd85c"
// };

// Variables entorno
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);


