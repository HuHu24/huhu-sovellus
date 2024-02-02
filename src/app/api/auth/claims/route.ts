import { auth, firestore } from "firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import { initFirebaseAdmin } from "@/firebaseAdmin"

export async function POST(request: NextRequest) {
  try {
    const result = (await request.json()) as {
      role: "admin" | "safety" | "subcamp"
      email: string
    }

    await initFirebaseAdmin()

    const user = (await auth().getUserByEmail(result.email)) as {
      email: string
      uid: string
    }

    const claimsDoc = await firestore().doc("/claims/claims").get()
    let data = claimsDoc.data() as {
      admin: [{ email: string; uid: string }]
      safety: [{ email: string; uid: string }]
      subcamp: [{ email: string; uid: string }]
    }

    data[result.role].push({ email: user.email, uid: user.uid })
    await firestore().doc("/claims/claims").set(data)

    const customClaims = { [result.role]: true }
    await auth().setCustomUserClaims(user.uid, customClaims)
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

export async function DELETE(request: NextRequest) {
  try {
    const result = (await request.json()) as {
      role: "admin" | "safety" | "subcamp"
      email: string
    }

    await initFirebaseAdmin()

    const user = (await auth().getUserByEmail(result.email)) as {
      email: string
      uid: string
    }

    const claimsDoc = await firestore().doc("/claims/claims").get()
    let data = claimsDoc.data() as {
      admin: [{ email: string; uid: string }]
      safety: [{ email: string; uid: string }]
      subcamp: [{ email: string; uid: string }]
    }

    const newData = data[result.role].filter(
      (item) => item.email !== user.email && item.uid !== user.uid
    )
    data[result.role] = newData as [{ email: string; uid: string }]

    await firestore().doc("/claims/claims").set(data)

    const customClaims = { [result.role]: false }
    await auth().setCustomUserClaims(user.uid, customClaims)
  } catch (e) {
    return NextResponse.json(
      {
        message:
          "Error occurred when processing custom claim. Check request body formatting and data",
      },
      { status: 400 }
    )
  }

  return NextResponse.json({ message: "removed custom claim" }, { status: 200 })
}
