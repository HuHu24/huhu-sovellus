import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { signOut } from "@/firebase"

export async function GET(request: NextRequest) {
  cookies().delete("session")
  await signOut()
  return NextResponse.redirect(
    new URL(`${process.env.NEXT_PUBLIC_URL}/huhu-sovellus/subcamp`, request.url)
  )
}
