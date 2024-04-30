import { auth } from "firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import { getDecodedClaims, subscribeToTopic } from "@/firebaseAdmin"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const result = (await request.json()) as { subcamp: string }
    const decodedClaims = await getDecodedClaims(
      cookies().get("session")?.value || ""
    )

    if (!isValidSubcamp(result.subcamp) || !decodedClaims?.uid) {
      throw new Error("Invalid subcamp or missing uid in decoded claims")
    }
    const user = await auth().getUser(decodedClaims.uid)
    console.log(user)
    if (result.subcamp === "aboa") {
      await auth().setCustomUserClaims(decodedClaims.uid, {
        ...user.customClaims,
        subcamp: result.subcamp,
        job: true,
      })
    } else {
      await auth().setCustomUserClaims(decodedClaims.uid, {
        ...user.customClaims,
        subcamp: result.subcamp,
      })
    }

    return successResponse(result.subcamp)
  } catch (error) {
    console.error(error)
    return errorResponse()
  }
}

function isValidSubcamp(subcamp: string) {
  return [
    "komodo",
    "centralPark",
    "rio",
    "bondiBeach",
    "matera",
    "aboa",
  ].includes(subcamp)
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

function successResponse(subcamp: string) {
  return NextResponse.json(
    {
      message: "Subcamp selected",
      subcamp: subcamp,
    },
    { status: 200 }
  )
}
