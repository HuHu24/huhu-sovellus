import { NextRequest, NextResponse } from "next/server"
import getUser from "@/utils/getUser"
import { cookies } from "next/headers"
import { firestore } from "firebase-admin"

export async function POST(request: NextRequest) {
  const data = await request.json()
  const user = await getUser(cookies().get("session")?.value || "")
  const docRef = firestore()
    .collection("activities")
    .doc(data.date + " " + data.title + " " + data.time)
  console.log(data.date + " " + data.title + " " + data.time)
  console.log("data", data)

  const doc = await docRef.get()
  if (!doc.exists) {
    return NextResponse.json(
      { Error: "Document does not exist" },
      { status: 400 }
    )
  }

  const participants = doc.data()?.participants || {}
  const maxParticipants = doc.data()?.maxParticipants || 0

  console.log(participants, maxParticipants)
  if (Object.keys(participants).length >= maxParticipants) {
    return NextResponse.json(
      { Error: "Maximum participants reached" },
      { status: 401 }
    )
  }
  await docRef.update({
    [`participants.${user?.uid}`]: data?.name,
  })
  return NextResponse.json({ Created: "Created" }, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const data = await request.json()
  const user = await getUser(cookies().get("session")?.value || "")
  const docRef = firestore()
    .collection("activities")
    .doc(data.date + " " + data.title + " " + data.time)

  await docRef.update({
    [`participants.${user?.uid}`]: firestore.FieldValue.delete(),
  })
  return NextResponse.json({ Deleted: "Deleted" }, { status: 200 })
}
