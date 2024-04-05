import { NextRequest, NextResponse } from "next/server"
import {
sendMessages
} from "@/firebaseAdmin"


export async function POST(request: NextRequest) {
    const data = await request.json()
    await sendMessages(data.title, data.message, data?.topic, data.page).catch((e) => {
        console.error("Error: " + e)
    },)
    return NextResponse.json("Message sent")
}
