import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/sign-up" || path === "/verify-email";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/sign-up", "/profile", "/verify-email"],
};
