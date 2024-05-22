// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { collection, doc, getDocs, getFirestore } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInAnonymously as fbSignInAnonymously,
  signInWithCustomToken as fbsignInWithCustomToken,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "@firebase/auth"
import { env } from "@/env"
import { getDoc, updateDoc } from "@firebase/firestore"
import { getMessaging, isSupported } from "firebase/messaging"
import { getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage"
import { SafetyChat } from "@/types/safetyChat"
import { SubcampChat } from "@/types/subcampChat"

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
export const messaging = async () => {
  try {
    return (await isSupported()) && getMessaging(app)
  } catch (e) {
    console.error("Error: " + e)
  }
}
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

export const signInWithCustomToken = async (customToken: string) => {
  try {
    const user = await fbsignInWithCustomToken(auth, customToken)
    await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await user.user.getIdToken()}`,
      },
    })
    console.log("Logged in as " + user.user.uid)
    location.replace("/")
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
  try {
    const docRef = doc(db, "releases", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      return docSnap.data()
    } else {
      console.log("No such document!")
    }
  } catch (e) {
    console.error("Error: " + e)
  }
}

export const getAllReleases = async () => {
  try {
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
  } catch (error) {
    console.error("Error getting documents: ", error)
  }
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
    alert("Virhe kuvan lataamisessa yritä uudelleen")
    throw error
  }
}

export const getSafetyChats = async () => {
  try {
    let data: SafetyChat[] = []
    const docs = await getDocs(collection(db, `/chats`))
    docs.forEach((tempDoc) => {
      data.push({ ...tempDoc.data(), id: tempDoc.id } as SafetyChat)
    })
    return data
  } catch (error) {
    if (error) {
      alert(
        "Käyttöoikeudet ovat virheelliset. Kirjaudu sovellukseen uudelleen, jos asiat eivät korjaudu laita viestiä sovelluskehittäjille"
      )
      window.location.href = "/auth/signin"
    }
  }
}

export const getSubcampChats = async () => {
  try {
    let data: SubcampChat[] = []
    const docs = await getDocs(collection(db, `/subcamp-chats`))
    docs.forEach((tempDoc) => {
      data.push({ ...tempDoc.data(), id: tempDoc.id } as SubcampChat)
    })
    return data
  } catch (error) {
    if (error) {
      alert(
        "Käyttöoikeudet ovat virheelliset. Kirjaudu sovellukseen uudelleen, jos asiat eivät korjaudu laita viestiä sovelluskehittäjille"
      )
      window.location.href = "/auth/signin"
    }
  }
}

export const getActivities = async () => {
  try {
    const snapshot = await getDocs(collection(db, "activities"))
    const activities: any[] = []
    snapshot.docs.forEach((doc) => {
      let activity = doc.data()
      activity.id = doc.id
      activities.push(activity)
    })
    return activities
  } catch (error) {
    if (error) {
      alert(
        "Käyttöoikeudet ovat virheelliset. Kirjaudu sovellukseen uudelleen, jos asiat eivät korjaudu laita viestiä sovelluskehittäjille"
      )
      window.location.href = "/auth/signin"
    }
  }
}
export const fbEditMaxParticipants = async (
  id: string,
  maxParticipants: number
) => {
  try {
    const docRef = doc(db, "activities", id)
    console.log("Kissa:" + docRef)
    await updateDoc(docRef, {
      maxParticipants: maxParticipants,
    })
  } catch (error) {
    if (error) {
      alert("jokin meni vikaan")
      console.error("Error updating document: ", error)
    }
  }
}
