// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGDOLaayTJxdlYWGfCscQ3Bp4e4md7r_o",
  authDomain: "huhu-sovellus.firebaseapp.com",
  projectId: "huhu-sovellus",
  storageBucket: "huhu-sovellus.appspot.com",
  messagingSenderId: "21166179095",
  appId: "1:21166179095:web:d0270d5f058e9b7f706d52",
  measurementId: "G-D4BZB5VX6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
