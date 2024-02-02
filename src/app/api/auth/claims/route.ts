import { auth, firestore } from "firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import { getFirestore } from "firebase/firestore"
import { initFirebaseAdmin } from "@/firebaseAdmin"

export async function POST(request: NextRequest) {
  try {
    const result = (await request.json()) as {
      role: "admin" | "safety" | "subcamp"
      uid: string
    }

    await initFirebaseAdmin()

    const user = (await auth().getUser(result.uid)) as { email: string }

    const claimsDoc = await firestore().doc("/claims/claims").get()
    let data = claimsDoc.data() as {
      admin: [{ email: string; uid: string }]
      safety: [{ email: string; uid: string }]
      subcamp: [{ email: string; uid: string }]
    }

    data[result.role].push({ email: user.email, uid: result.uid })
    await firestore().doc("/claims/claims").set(data)

    const customClaims = { [result.role]: true }
    await auth().setCustomUserClaims(result.uid, customClaims)
  } catch (e) {
    return NextResponse.json(
      {
        message:
          "Error occurred when processing custom claim. Check request body formatting and data",
      },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { message: "added admin custom claims" },
    { status: 200 }
  )
}
