importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js")
const firebaseConfig = {
  apiKey: "AIzaSyAGDOLaayTJxdlYWGfCscQ3Bp4e4md7r_o",
  authDomain: "huhu-sovellus.firebaseapp.com",
  projectId: "huhu-sovellus",
  storageBucket: "huhu-sovellus.appspot.com",
  messagingSenderId: "21166179095",
  appId: "1:21166179095:web:d0270d5f058e9b7f706d52",
  measurementId: "G-D4BZB5VX6S",
}
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})
