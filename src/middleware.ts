import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  isDevAdminBypass,
  verifySessionToken,
} from "@/lib/admin-session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isDevAdminBypass()) {
    if (pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/basics", request.url));
    }
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthed = verifySessionToken(session);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthed) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname === "/admin/login" && isAuthed) {
    return NextResponse.redirect(new URL("/admin/basics", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
