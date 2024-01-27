import {initFirebaseAdmin} from "@/firebaseAdmin";
import {NextResponse} from "next/server";
import {auth} from "firebase-admin";
import {cookies} from "next/headers";

export const checkAuth = async () => {
  await initFirebaseAdmin()

  const session = cookies().get("session")?.value || ""

  if (!session) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 })
  }

  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    return NextResponse.json(
      { message: "Couldn't retrieve the user" },
      { status: 403 }
    )
  }

  const user = await auth().getUser(decodedClaims.uid)

  if (
    !user.customClaims ||
    !user.customClaims.hasOwnProperty("admin") ||
    !user.customClaims.admin
  ) {
    return NextResponse.json(
      { message: "Admin permissions required" },
      { status: 403 }
    )
  }

  return;
}