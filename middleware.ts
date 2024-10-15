import type { NextRequest, } from 'next/server'
import { NextResponse } from 'next/server'
export async function middleware(req: NextRequest) {
  if (req.url.includes("/logout")) {
    const response = NextResponse.redirect(new URL('/', req.url))

    response.cookies.delete("accessToken")
    response.cookies.delete("refreshToken")

    return response;
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/logout'],
}