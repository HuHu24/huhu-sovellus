import { NextRequest, NextResponse } from "next/server"
import { getDecodedClaims } from "@/firebaseAdmin"
import { cookies } from "next/headers"
import { auth } from "firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const result = (await request.json()) as { job: boolean }
    const decodedClaims = await getDecodedClaims(
      cookies().get("session")?.value || ""
    )

    if (!decodedClaims?.uid) {
      return NextResponse.json(
        { message: "Missing uid in decoded claims" },
        { status: 400 }
      )
    }

    const user = await auth().getUser(decodedClaims.uid)
    console.log(user)

    await auth().setCustomUserClaims(decodedClaims.uid, {
      ...user.customClaims,
      job: result.job,
    })
    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.error(error)
  }
}
