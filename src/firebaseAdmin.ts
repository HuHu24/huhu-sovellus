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

//can be used to get info about the user
//don't call it directly rather use it to build functions to get the info u need
export async function getDecodedClaims(session: string) {
  await initFirebaseAdmin()

  if (!session) {
    return null
  }

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

export const subscribeToTopic = async (token: string, topic: string) => {
  try {
    await admin.messaging().subscribeToTopic(token, topic)
    console.log("Subscribed to topic: ", topic)
  } catch (e) {
    console.error("Error: " + e)
  }
  return topic
}
export const unsubscribeFromTopic = async (token: string, topic: string) => {
  try {
    await admin.messaging().unsubscribeFromTopic(token, topic)
    console.log("Unsubscribed from topic: ", topic)
  } catch (e) {
    console.error("Error: " + e)
  }
  return topic
}
export const sendMessages = async (
  message: string,
  title: string,
  topic: string,
  page: string
) => {
  admin
    .messaging()
    .send({
      notification: {
        title: title,
        body: message,
      },
      topic: topic,
      webpush: {
        fcmOptions: {
          link: page,
        },
      },
    })
    .then((response) => {
      console.log("Successfully sent message:", response)
    })
    .catch((error) => {
      console.log("Error sending message:", error)
    })
}

export const saveMessage = async (
  message: string,
  title: string,
  topic: string,
  page: string,
  email: string
) => {
  const data = {
    title: title,
    message: message,
    topic: topic,
    page: page,
    email: email,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  }
  try {
    const docRef = await admin.firestore().collection("messages").add(data)
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error: " + e)
  }
  return data
}

export const anonAuth = async (subcamp: string) => {
  await initFirebaseAdmin()
  try {
    let customToken = ""
    await admin
      .auth()
      .createUser({
        disabled: false,
      })
      .then(async (userRecord) => {
        console.log("Successfully created new user:", userRecord)
        await admin
          .auth()
          .setCustomUserClaims(userRecord.uid, { subcamp: subcamp })
        customToken = await admin.auth().createCustomToken(userRecord.uid)
        if (customToken) {
          console.log("Successfully created new custom token:", customToken)
          return customToken
        }
      })
      .catch((error) => {
        console.log("Error creating new user:", error)
      })

    return customToken
  } catch (e) {
    console.error("Error: " + e)
  }
}
