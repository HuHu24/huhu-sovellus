// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { collection, doc, getDocs, getFirestore } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInAnonymously as fbSignInAnonymously,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "@firebase/auth"
import { env } from "@/env"
import { getDoc } from "@firebase/firestore"
import { getMessaging, isSupported } from "firebase/messaging"
import { getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage"
import { Chat } from "@/types/chat"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
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
export const messaging = async () => (await isSupported()) && getMessaging(app)
export const auth = getAuth(app)

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    console.log("Logged in as " + user.user.email)

    await fetch("/api/auth", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await user.user.getIdToken()}`,
      },
    })

    location.replace(`${env.NEXT_PUBLIC_URL}/admin`)
  } catch (e) {
    console.error("Error: " + e)
    alert("Ongelma kirjautumisessa. Tarkista salasana ja sähköposti.")
  }
}

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log("Created account for " + user.user.email)

    await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await user.user.getIdToken()}`,
      },
    })

    location.replace(`${env.NEXT_PUBLIC_URL}/admin`)
  } catch (e) {
    console.error("Error: " + e)
    alert("Ongelma käyttäjän luomisessa. Tarkista salasana ja sähköposti.")
  }
}

export const signInAnonymously = async () => {
  try {
    const user = await fbSignInAnonymously(auth)
    await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`, {
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
export const getRelease = async (id: string) => {
  const docRef = doc(db, "releases", id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data())
    return docSnap.data()
  } else {
    console.log("No such document!")
  }
}

export const getAllReleases = async () => {
  const releasesRef = collection(db, "releases")
  const snapshot = await getDocs(releasesRef)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      timestamp: new Date(`${data.date}T${data.time}`),
    }
  })
}
const storage = getStorage(app)
export const uploadImage = async (file: File) => {
  try {
    const storageRef = ref(storage, `images/${file.name + Date.now()}`)
    await uploadBytes(storageRef, file).then(() => {
      console.log("Uploaded a blob or file!")
    })
    console.log("File available at", await getDownloadURL(storageRef))

    return getDownloadURL(storageRef)
  } catch (error) {
    console.error("Error uploading image: ", error)
    throw error
  }
}

export const getChats = async () => {
  let data: Chat[] = []
  const docs = await getDocs(collection(db, "/chats"))
  docs.forEach((tempDoc) => {
    data.push({ ...tempDoc.data(), id: tempDoc.id } as Chat)
  })
  return data
}
