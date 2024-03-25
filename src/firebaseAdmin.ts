import * as admin from "firebase-admin"
import { ServiceAccount } from "firebase-admin"
import { env } from "@/env"
import { NextRequest } from "next/server"
import { cookies } from "next/headers"

export const initFirebaseAdmin = async () => {
  if (admin.apps.length > 0) {
    return admin.app()
  }

  const serviceAccount: ServiceAccount = {
    projectId: env.FB_PROJECT_ID,
    privateKey: env.FB_PRIVATE_KEY,
    clientEmail: env.FB_CLIENT_EMAIL,
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.projectId,
  })
}

//can be used to get info about the user
//don't call it directly rather use it to build functions to get the info u need
export async function getDecodedClaims(session: string) {
  await initFirebaseAdmin()

  if (!session) {
    return null
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await admin.auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    return null
  }

  return decodedClaims
}

export const uploadRelease = async (data: any) => {
  try {
    const docRef = await admin.firestore().collection("releases").add(data)
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error: " + e)
  }
  return data
}
export const updateRelease = async (data: any) => {
  console.log(data.id)
  try {
    await admin.firestore().collection("releases").doc(data.id).set(data)
    console.log("Document updated with ID: ", data.id)
  } catch (e) {
    console.error("Error: " + e)
  }
  return data
}
export const deleteRelease = async (id: string) => {
  try {
    await admin.firestore().collection("releases").doc(id).delete()
    console.log("Document deleted with ID: ", id)
  } catch (e) {
    console.error("Error: " + e)
  }
  return id
}
