import { auth } from "firebase-admin"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { initFirebaseAdmin } from "@/firebaseAdmin"

// Init the Firebase SDK every time the server is called

export async function POST(request: NextRequest, response: NextResponse) {
  await initFirebaseAdmin()
  const authorization = headers().get("Authorization")
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1]
    const decodedToken = await auth().verifyIdToken(idToken)

    if (decodedToken) {
      //Generate session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      })
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      }

      //Add the cookie to the browser
      cookies().set(options)
    }
  }

  return NextResponse.json({}, { status: 200 })
}
