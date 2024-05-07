import { getToken, onMessage } from "firebase/messaging"
import { messaging } from "@/firebase"

const vapidKey =
  "BFypJIB2nAgpYuxeAgPfkn44xbmIzD_BUsQrb70Ic8exJKQt8fqnn_ZYdICyDBGrC7ZSV1nXQutfp9ET3cPRwzs"

export async function requestMessagingPermission() {
  console.log("Requesting permission")
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
    await saveMessagingToken()
  } else {
    console.log("Notification permission denied.")
  }
}

export async function saveMessagingToken() {
  const msg = await messaging()
  if (typeof msg === "boolean") {
    await requestMessagingPermission()
    return
  }
  if (!msg) {
    console.log("Messaging not supported")
    return
  }
  const fcmToken = await getToken(msg, { vapidKey: vapidKey })
  if (fcmToken) {
    console.log("FCM Token: ", fcmToken)
    localStorage.setItem("messagingToken", fcmToken)
    onMessage(msg, (message) => {
      if (message.notification && message.notification.title) {
        console.log("Message received. ", message)
        new Notification(message.notification.title, message.notification)
      }
    })
    return fcmToken
  } else {
    await requestMessagingPermission()
  }
}
