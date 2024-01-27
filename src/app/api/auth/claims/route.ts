import { auth } from "firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import {checkAuth} from "@/utils";

export async function POST(request: NextRequest) {
  const result = await checkAuth()
  if (result) {
    return result
  }

  try {

    const result = (await request.json()) as { role: "admin"; uid: string }
    await auth().setCustomUserClaims(result.uid, { admin: true })
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
