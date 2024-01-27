import * as admin from "firebase-admin"
import { ServiceAccount } from "firebase-admin"
import { env } from "@/env"

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
