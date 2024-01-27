import { auth } from "firebase-admin"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { initFirebaseAdmin } from "@/firebaseAdmin"

export async function POST(request: NextRequest, response: NextResponse) {
  await initFirebaseAdmin()

  const session = cookies().get("session")?.value || ""

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 })
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    return NextResponse.json({ message: "Couldn't retrieve the user" }, { status: 403 })
  }

  const user = await auth().getUser(decodedClaims.uid)

  if (!user.customClaims || !user.customClaims.hasOwnProperty("admin") || !user.customClaims.admin) {
    return NextResponse.json({ message: "Admin permissions required" }, { status: 403 })
  }

  try {
    const result = await request.json() as { role: "admin", uid: string }
    await auth().setCustomUserClaims(result.uid, { admin: true })

  } catch (e) {
    return NextResponse.json({ message: "Error occurred when processing custom claim. Check request body formatting and data" }, { status: 400 })
  }

  return NextResponse.json({ message: "added admin custom claims" }, { status: 200 })
}
