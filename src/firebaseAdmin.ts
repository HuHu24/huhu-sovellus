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
//dont call it directly rather use it to buiild functions to get the info u need
async function getDecodedclaims(request: NextRequest) {
  await initFirebaseAdmin()

  const session = cookies().get("session")?.value || ""

  //Validate if the cookie exist in the request
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

export async function getUid(request: NextRequest) {
  const claims = await getDecodedclaims(request)
  const uid = claims?.uid
  return uid
}
