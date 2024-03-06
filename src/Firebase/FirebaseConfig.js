// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5AMoLCs0LylGNaa_jY7Vk_6PdBeULeMA",
  authDomain: "expense-tracker-auth-dev.firebaseapp.com",
  databaseURL: "https://expense-tracker-auth-dev-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-auth-dev",
  storageBucket: "expense-tracker-auth-dev.appspot.com",
  messagingSenderId: "250471586822",
  appId: "1:250471586822:web:093c4d8adb3705525d3787"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuthentication = getAuth(FirebaseApp)
export {FirebaseAuthentication}