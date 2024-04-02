import { auth } from "firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import { getDecodedClaims, subscribeToTopic } from "@/firebaseAdmin"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const result = (await request.json()) as { subcamp: number; token: string }
  const decodedClaims = await getDecodedClaims(
    cookies().get("session")?.value || ""
  )

  if (!isValidSubcamp(result.subcamp) || !decodedClaims?.uid) {
    return errorResponse()
  }

  await subscribeToTopic(result.token, result.subcamp.toString())
  await auth().setCustomUserClaims(decodedClaims.uid, {
    subcamp: result.subcamp,
  })

  return successResponse(result.subcamp)
}

function isValidSubcamp(subcamp: number) {
  return subcamp && subcamp >= 1 && subcamp <= 6
}

function errorResponse() {
  return NextResponse.json(
    {
      message:
        "Error occurred when processing custom claim. Check request body formatting and data",
    },
    { status: 400 }
  )
}

function successResponse(subcamp: number) {
  return NextResponse.json(
    {
      message: "Subcamp selected",
      subcamp: subcamp,
    },
    { status: 200 }
  )
}
