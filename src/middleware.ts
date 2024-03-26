import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { env } from "@/env"

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session")
  if (
    request.nextUrl.pathname.endsWith("/api/auth/claims") ||
    request.nextUrl.pathname.includes("/admin/")
  ) {
    console.log("Koira")
    if (!session) {
      return NextResponse.redirect(
        new URL(`${env.NEXT_PUBLIC_URL}/auth/signin`, request.url)
      )
    }

    //Call the authentication endpoint
    const responseAPI = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`, {
      headers: {
        Cookie: `session=${session?.value}`,
      },
    })
    //Return to /login if token is not authorized
    if (responseAPI.status != 200) {
      return NextResponse.redirect(
        new URL(`${env.NEXT_PUBLIC_URL}/auth/signin`, request.url)
      )
    }

    const data = await responseAPI.json()
    const body = data as {
      claims: { admin?: boolean; subcampLeader?: boolean; safety?: boolean }
      email?: string
    }

    if (!body.email && request.url.includes("/admin")) {
      return NextResponse.redirect(
        new URL(`${env.NEXT_PUBLIC_URL}/`, request.url)
      )
    }
    if (
      (!body.claims || body.claims.admin !== true) &&
      (request.url.endsWith("claims") || request.url.endsWith("access"))
    ) {
      if (request.url.endsWith("access")) {
        return NextResponse.redirect(
          new URL(`${env.NEXT_PUBLIC_URL}/auth/signin`, request.url)
        )
      }
      return NextResponse.json(
        { message: "Admin permissions required" },
        { status: 403 }
      )
    }

    return NextResponse.next()
  }

  const pathname = request.nextUrl.pathname
  if (
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/releases") &&
    !pathname.startsWith("/chat") &&
    !pathname.startsWith("/timetable") &&
    pathname != "/"
  ) {
    return NextResponse.next()
  }

  if (!session) {
    return NextResponse.redirect(
      new URL(`${env.NEXT_PUBLIC_URL}/subcamp`, request.url)
    )
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  })
  //Return to /login if token is not authorized
  if (responseAPI.status != 200) {
    return NextResponse.redirect(
      new URL(`${env.NEXT_PUBLIC_URL}/subcamp`, request.url)
    )
  }

  const data = await responseAPI.json()
  const body = data as {
    claims: { admin?: boolean; subcampLeader?: boolean; safety?: boolean }
    email?: string
  }

  return NextResponse.next()
}

//Add your protected routes
export const config = {
  matcher: ["/:path*"],
}
