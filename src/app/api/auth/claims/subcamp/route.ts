import { auth } from "firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import { getDecodedClaims } from "@/firebaseAdmin"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const result = (await request.json()) as { subcamp: number }
    if (!result.subcamp || result.subcamp < 1 || result.subcamp > 6) {
      return NextResponse.json(
        {
          message:
            "Error occurred when processing custom claim. Check request body formatting and data",
        },
        { status: 400 }
      )
    }

    const decodedClaims = await getDecodedClaims(
      cookies().get("session")?.value || ""
    )
    if (!decodedClaims?.uid) {
      return NextResponse.json(
        {
          message: "There was an error with your session",
        },
        { status: 400 }
      )
    }

    await auth().setCustomUserClaims(decodedClaims.uid, {
      subcamp: result.subcamp,
    })

    return NextResponse.json(
      {
        message: "Subcamp selected",
        subcamp: result.subcamp,
      },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json(
      {
        message:
          "Error occurred when processing custom claim. Check request body formatting and data",
      },
      { status: 400 }
    )
  }
}
