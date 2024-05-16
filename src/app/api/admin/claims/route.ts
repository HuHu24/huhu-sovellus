import { auth, firestore } from "firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import { initFirebaseAdmin } from "@/firebaseAdmin"

export async function POST(request: NextRequest) {
  try {
    const result = (await request.json()) as {
      role: "admin" | "safety" | "subcampLeader" | "activity" | "upkeep"
      email: string
    }

    await initFirebaseAdmin()

    const user = await auth().getUserByEmail(result.email)

    const claimsDoc = await firestore().doc("/claims/claims").get()
    let data = claimsDoc.data() as {
      admin: string[]
      safety: string[]
      subcampLeader: string[]
      activity: string[]
      upkeep: string[]
    }

    data[result.role].push(user.email || "")
    await firestore().doc("/claims/claims").set(data)

    const customClaims = Object.assign({}, user.customClaims, {
      [result.role]: true,
    })
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

  return NextResponse.json({ message: "added custom claims" }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
  try {
    const result = (await request.json()) as {
      role: "admin" | "safety" | "subcampLeader" | "activity" | "upkeep"
      email: string
    }

    await initFirebaseAdmin()

    const user = await auth().getUserByEmail(result.email)

    const claimsDoc = await firestore().doc("/claims/claims").get()
    let data = claimsDoc.data() as {
      admin: string[]
      safety: string[]
      subcampLeader: string[]
      activity: string[]
      upkeep: string[]
    }

    const newData = data[result.role].filter((item) => item !== user.email)
    data[result.role] = newData as string[]

    await firestore().doc("/claims/claims").set(data)

    const newCustomClaims = Object.assign({}, user.customClaims, {
      [result.role]: false,
    })
    await auth().setCustomUserClaims(user.uid, newCustomClaims)
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
