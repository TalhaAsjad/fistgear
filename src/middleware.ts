import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const protectedRoutes = ["/home", "/contact"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Redirect unauthenticated users away from protected routes
  if (protectedRoutes.includes(pathname) && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from the login page
  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/contact"],
};
