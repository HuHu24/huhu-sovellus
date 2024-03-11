// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously as fbSignInAnonymously,
  signOut as fbSignOut,
} from "@firebase/auth"
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
  measurementId: "G-D4BZB5VX6S",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
export const auth = getAuth(app)

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    console.log("Logged in as " + user.user.email)

    await fetch("/huhu-sovellus/api/auth", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await user.user.getIdToken()}`,
      },
    })

    location.replace(`${process.env.NEXT_PUBLIC_URL}/huhu-sovellus/admin`)
  } catch (e) {
    console.error("Error: " + e)
  }
}

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log("Created account for " + user.user.email)

    await fetch(`${process.env.NEXT_PUBLIC_URL}/huhu-sovellus/api/auth`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await user.user.getIdToken()}`,
      },
    })

    location.replace(`${process.env.NEXT_PUBLIC_URL}/huhu-sovellus/admin`)
  } catch (e) {
    console.error("Error: " + e)
  }
}

export const signInAnonymously = async () => {
  try {
    const user = await fbSignInAnonymously(auth)
    await fetch(`${process.env.NEXT_PUBLIC_URL}/huhu-sovellus/api/auth`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await user.user.getIdToken()}`,
      },
    })
  } catch (e) {
    console.error("Error: " + e)
  }
}

export const signOut = async () => {
  try {
    await fbSignOut(auth)
  } catch (e) {
    console.error("Error: " + e)
  }
}
