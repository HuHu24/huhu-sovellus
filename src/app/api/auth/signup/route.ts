import { NextRequest, NextResponse } from "next/server"
import { anonAuth } from "@/firebaseAdmin"

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    let subcamps = [
      "komodo",
      "centralPark",
      "rio",
      "bondiBeach",
      "matera",
      "aboa",
    ]
    const subcamp = (await request.json()) as { subcamp: string }
    if (!subcamps.includes(subcamp.subcamp)) {
      return NextResponse.json({ status: 400 })
    }
    const user = await anonAuth(subcamp.subcamp)
    return NextResponse.json({ customToken: user, status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ status: 400 })
  }
}
