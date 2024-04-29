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

  const doc = await docRef.get()
  if (!doc.exists) {
    return NextResponse.json(
      { Error: "Document does not exist" },
      { status: 404 }
    )
  }
  // @ts-ignore
  const participants = doc.data().participants || []
  // @ts-ignore
  const maxParticipants = doc.data().maxParticipants || 0
  console.log(participants, maxParticipants)
  if (participants.length >= maxParticipants) {
    return NextResponse.json(
      { Error: "Maximum participants reached" },
      { status: 400 }
    )
  }
  await docRef.update({
    participants: firestore.FieldValue.arrayUnion(user?.uid),
  })
  return NextResponse.json({ Created: "Created" }, { status: 201 })
}
