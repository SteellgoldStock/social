import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  
  const PUBLIC_PATHS = ["/join", "/onboard"];
  
  if (request.nextUrl.pathname.startsWith("/api") || 
      request.nextUrl.pathname.startsWith("/_next") ||
      request.nextUrl.pathname.startsWith("/public")) {
    return NextResponse.next();
  }

  if (!session?.user) {
    if (!PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/join", request.url));
    }
    return NextResponse.next();
  }

  if (session.user && !session.user.username) {
    if (request.nextUrl.pathname !== "/onboard") {
      return NextResponse.redirect(new URL("/onboard", request.url));
    }
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|public|.*\\..*$).*)"
  ]
};