import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session")

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(
      new URL("http://localhost:3000/huhu-sovellus/auth/signin", request.url)
    )
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(
    "http://localhost:3000/huhu-sovellus/api/auth",
    {
      headers: {
        Cookie: `session=${session?.value}`,
      },
    }
  )

  //Return to /login if token is not authorized
  if (responseAPI.status != 200) {
    return NextResponse.redirect(
      new URL("http://localhost:3000/huhu-sovellus/auth/signin", request.url)
    )
  }
  
  const body = (await responseAPI.json()) as {
    claims: { admin?: boolean; subcamp?: boolean; safety?: boolean }
  }

  if (body.claims.admin && request.url.endsWith("claims")) {
    return NextResponse.redirect(
      new URL("http://localhost:3000/huhu-sovellus", request.url)
    )
  }

  return NextResponse.next()
}

//Add your protected routes
export const config = {
  matcher: ["/api/auth/claims/:path*", "/admin/:path*"],
}
