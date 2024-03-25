import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { signOut } from "@/firebase"
import { env } from "@/env"

export async function GET(request: NextRequest) {
  cookies().delete("session")
  await signOut()
  return NextResponse.redirect(
    new URL(`${env.NEXT_PUBLIC_URL}/subcamp`, request.url)
  )
}
