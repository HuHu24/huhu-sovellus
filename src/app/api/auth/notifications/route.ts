import { NextRequest, NextResponse } from "next/server"
import { subscribeToTopic } from "@/firebaseAdmin"

export async function POST(request: NextRequest) {
  const result = (await request.json()) as { subcamp: number; token: string }

  await Promise.all([
    subscribeToTopic(result.token, result.subcamp.toString()),
    subscribeToTopic(result.token, "Kaikki"),
  ])
    .then(() => {
      return NextResponse.json("Notification enabled")
    })
    .catch((error) => {
      console.error(error)
      return NextResponse.json(
        "Error occurred when processing custom claim. Check request body formatting and data"
      )
    })
  return NextResponse.json(
    "Error occurred when processing custom claim. Check request body formatting and data"
  )
}
