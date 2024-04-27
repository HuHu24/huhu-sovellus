import { auth } from "firebase-admin"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { initFirebaseAdmin } from "@/firebaseAdmin"

export async function GET(request: NextRequest) {
  await initFirebaseAdmin()

  const session = cookies().get("session")?.value || ""

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ claims: {} }, { status: 401 })
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    return NextResponse.json({ claims: {} }, { status: 401 })
  }

  const user = await auth().getUser(decodedClaims.uid)

  return NextResponse.json(
    { claims: user.customClaims, uid: user.uid, email: user.email },
    { status: 200 }
  )
}

export async function POST(request: NextRequest, response: NextResponse) {
  await initFirebaseAdmin()
  const authorization = headers().get("Authorization")
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1]
    const decodedToken = await auth().verifyIdToken(idToken)

    if (decodedToken) {
      //Generate session cookie
      const expiresIn = 60 * 60 * 24 * 14 * 1000
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
