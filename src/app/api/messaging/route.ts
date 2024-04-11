import { NextRequest, NextResponse } from "next/server"
import { sendMessages, saveMessage, getDecodedClaims } from "@/firebaseAdmin"

export async function POST(request: NextRequest) {
  try {
    const user = await getDecodedClaims(
      request.cookies.get("session")?.value || ""
    )
    if (!user) {
      throw new Error("User not found")
    }
    const data = await request.json()
    await Promise.all([
      saveMessage(
        data.title,
        data.message,
        data.topic,
        data.page,
        user?.email || ""
      ),
      sendMessages(data.title, data.message, data?.topic, data.page),
    ])

    return NextResponse.json("Message sent")
  } catch (e) {
    console.error("Error: " + e)
  }
}
